import { Handler } from "@netlify/functions";
import { BlogPost, Prisma } from "@prisma/client";
import { getNetlifyFunctionHandler } from "../utils/getNetlifyFunctionHandler";

export const handler: Handler = async (event) => {
  return await getNetlifyFunctionHandler<BlogPost[]>({ 
    event,
    errorMessage: 'Failed to fetch blog posts',
    getQueryResponse: async ({ prisma, event }) => {
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
  
      return await prisma.blogPost.findMany(query);      
    }
  });
};
