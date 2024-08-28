import { HandlerEvent, HandlerResponse } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";
import { Client } from 'memjs';

const memcachedClient = Client.create(process.env.MEMCACHIER_SERVERS || '', {
  username: process.env.MEMCACHIER_USERNAME || '',
  password: process.env.MEMCACHIER_PASSWORD || '',
})

const prisma = new PrismaClient();

interface CacheConfig {
  key: string;
  expiry: number;
}

interface QueryResponseProps {
  prisma: PrismaClient;
  event: HandlerEvent;
}

export type QueryResponseType<T> = (props:QueryResponseProps) => Promise<T>;

interface GetNetlifyFunctionHandlerProps<T> {
  event: HandlerEvent;
  errorMessage: string;
  getQueryResponse: QueryResponseType<T>;
  cacheConfig?: CacheConfig;
}

export async function getNetlifyFunctionHandler<T>(
  props: GetNetlifyFunctionHandlerProps<T>
): Promise<HandlerResponse> {

  const { event, errorMessage, getQueryResponse, cacheConfig } = props;

  try {
    let response: T;

    if ( cacheConfig ) {
      const { value: cachedData } = await memcachedClient.get(cacheConfig.key)

      if ( cachedData ) {
        console.log('Cache hit for key: ', cacheConfig.key);
        response = JSON.parse(cachedData.toString());
      } else {
        console.log('Cache miss for key: ', cacheConfig.key);
        response = await getQueryResponse({ prisma, event });

        await memcachedClient.set(
          cacheConfig.key,
          JSON.stringify(response),
          { expires: cacheConfig.expiry }
        );
      }
    } else {
      response = await getQueryResponse({ prisma, event });
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error(`${errorMessage}: `, error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: errorMessage, details: error }),
    };
  } finally {
    await prisma.$disconnect();
  }
}


export const clearMemCache = async (cacheKey: string) => {
  try {
    await memcachedClient.delete(cacheKey);
    console.log(`Cache cleared successfully for key: ${cacheKey}`);
  } catch (error) {
    console.error(`Failed to clear cache for key ${cacheKey}: `, error);
  }
};