import { HandlerResponse } from "@netlify/functions";
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
}

export type QueryResponseType<T> = (props:QueryResponseProps) => Promise<T>;

interface GetNetlifyFunctionHandlerProps<T> {
  errorMessage: string;
  cacheConfig?: CacheConfig;
  getQueryResponse: QueryResponseType<T>;
}

export async function getNetlifyFunctionHandler<T>(
  props: GetNetlifyFunctionHandlerProps<T>
): Promise<HandlerResponse> {

  const { errorMessage, cacheConfig, getQueryResponse } = props;

  try {
    let response: T;

    if ( cacheConfig ) {
      const { value: cachedData } = await memcachedClient.get(cacheConfig.key)


      try {
        const { value: cachedData } = await memcachedClient.get(cacheConfig.key);
        if (cachedData) {
          console.log('Cache hit for key: ', cacheConfig.key);
          response = JSON.parse(cachedData.toString());
        } else {
          console.log('Cache miss for key: ', cacheConfig.key);
          response = await getQueryResponse({ prisma });
          await setCacheData(cacheConfig, response);
        }
      } catch (cacheError) {
        console.log('Cache error, falling back to database query: ', cacheError);
        response = await getQueryResponse({ prisma });
        await setCacheData(cacheConfig, response);
      }


      if ( cachedData ) {
        console.log('Cache hit for key: ', cacheConfig.key);
        response = JSON.parse(cachedData.toString());
      } else {
        console.log('Cache miss for key: ', cacheConfig.key);
        response = await getQueryResponse({ prisma });

        await memcachedClient.set(
          cacheConfig.key,
          JSON.stringify(response),
          { expires: cacheConfig.expiry }
        );
      }
    } else {
      response = await getQueryResponse({ prisma });
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

// export const clearMemCache = async (cacheKey: string) => {
//   try {
//     await memcachedClient.delete(cacheKey);
//     console.log(`Cache cleared successfully for key: ${cacheKey}`);
//   } catch (error) {
//     console.error(`Failed to clear cache for key ${cacheKey}: `, error);
//   }
// };

async function setCacheData<T>(cacheConfig: CacheConfig, data: T) {
  try {
    await memcachedClient.set(
      cacheConfig.key,
      JSON.stringify(data),
      { expires: cacheConfig.expiry }
    );
    console.log('Cache set successfully for key: ', cacheConfig.key);
  } catch (setCacheError) {
    console.error('Failed to set cache: ', setCacheError);
  }
}
