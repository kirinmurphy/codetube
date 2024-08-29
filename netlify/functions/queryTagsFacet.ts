import { Handler } from "@netlify/functions";
import { Tag } from "@prisma/client";
import { getNetlifyFunctionHandler } from "../utils/getNetlifyFunctionHandler";
// import { GLOBAL_CACHE_EXPIRY, QueryCacheKeys } from "../utils/constants";

export const handler: Handler = async (event) => {
  return await getNetlifyFunctionHandler<Tag[]>({ 
    event,
    errorMessage: 'Failed to fetch tags facet',
    // cacheConfig: {
    //   key: QueryCacheKeys.TAG_FACET_CACHE_KEY,
    //   expiry: GLOBAL_CACHE_EXPIRY
    // },
    getQueryResponse: async ({ prisma, }) => {
      const tags = await prisma.tag.findMany({
        include: { _count: { select: { posts: true, }}}
      });
  
      const tagsWithCount = tags
        .map(tag => ({
          id: tag.id,
          name: tag.name,
          readableName: tag.name.replace(/_/g, ' '),
          count: tag._count.posts,
        }))
        .sort((a, b) => b.count - a.count);
  
      return tagsWithCount;        
    }
  });
};
