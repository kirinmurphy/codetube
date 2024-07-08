import prisma from "../../prisma/prismaClient";

exports.handler = async function(event, context) {
  try {
    const data = await prisma.user.findMany();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
