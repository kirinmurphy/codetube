import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handler: Handler = async () => {
  try {
    await prisma.$connect();
    return {
      statusCode: 200,
      body: "Database connected successfully",
    };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to connect to the database", details: error}),
    };
  } finally {
    await prisma.$disconnect();
  }
};
