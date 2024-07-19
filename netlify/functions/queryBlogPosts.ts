import { Handler } from "@netlify/functions";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handler: Handler = async (event) => {
  try {
    console.log('bayyyyyyyyy');
    const tag = event.queryStringParameters?.tag || '';

    const getAllItemsQuery: Prisma.BlogPostFindManyArgs = {
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    }
  
    const getItemsByTagQuery: Prisma.BlogPostFindManyArgs = {
      where: {
        tags: {
          some: {
            tag: {
              name: tag,
            },
          },
        },
      },
      ...getAllItemsQuery,
    }
  
    const query = tag ? getItemsByTagQuery : getAllItemsQuery;

    const blogPosts = await prisma.blogPost.findMany(query);

    // console.log('Blog posts fetched:', blogPosts);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogPosts),
    };
  } catch (error) {
    console.error('Error in Netlify function:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: "Failed to fetch blog posts", details: error }),
    };
  } finally {
    await prisma.$disconnect();
  }
};
