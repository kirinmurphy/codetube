import { HandlerEvent, HandlerResponse } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface QueryResponseProps {
  prisma: PrismaClient;
  event: HandlerEvent;
}

export type QueryResponseType<T> = (props:QueryResponseProps) => Promise<T>;

interface GetNetlifyFunctionHandlerProps<T> {
  event: HandlerEvent;
  errorMessage: string;
  getQueryResponse: QueryResponseType<T>;
}

export async function getNetlifyFunctionHandler<T>(
  props: GetNetlifyFunctionHandlerProps<T>
): Promise<HandlerResponse> {

  const { event, errorMessage, getQueryResponse } = props;

  try {
    const response = await getQueryResponse({ prisma, event });

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
