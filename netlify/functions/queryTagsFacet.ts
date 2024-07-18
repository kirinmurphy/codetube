import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handler: Handler = async () => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    const tagsWithCount = tags
      .map(tag => ({
        id: tag.id,
        name: tag.name,
        readableName: tag.name.replace(/_/g, ' '),
        count: tag._count.posts,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tagsWithCount),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: "Failed to fetch tags facet" }),
    };
  } finally {
    await prisma.$disconnect();
  }
};
