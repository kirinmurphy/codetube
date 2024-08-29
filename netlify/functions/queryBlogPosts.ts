import { Handler } from "@netlify/functions";
import { BlogPost, Prisma } from "@prisma/client";
import { getNetlifyFunctionHandler } from "../utils/getNetlifyFunctionHandler";
import { QueryCacheKeys, GLOBAL_CACHE_EXPIRY } from "../utils/constants";

export const handler: Handler = async (event) => {
  const tag = event.queryStringParameters?.tag || '';

  return await getNetlifyFunctionHandler<BlogPost[]>({ 
    errorMessage: 'Failed to fetch blog posts',
    cacheConfig: {
      key: QueryCacheKeys.BLOG_POST_CACHE_KEY+tag,
      expiry: GLOBAL_CACHE_EXPIRY
    },
    getQueryResponse: async ({ prisma }) => {  
      const getAllItemsQuery: Prisma.BlogPostFindManyArgs = {
        include: { tags: { include: { tag: true }}} 
      };
    
      const getItemsByTagQuery: Prisma.BlogPostFindManyArgs = {
        where: { tags: { some: { tag: { name: tag }}}},
        ...getAllItemsQuery,
      };
    
      const query = tag ? getItemsByTagQuery : getAllItemsQuery;
  
      return await prisma.blogPost.findMany(query);      
    }
  });
};
