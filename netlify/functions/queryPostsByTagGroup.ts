import { Handler } from "@netlify/functions";
import { BlogPost, Tag } from "@prisma/client";
import { getNetlifyFunctionHandler } from "../utils/getNetlifyFunctionHandler";

type BlogPostWithTags = BlogPost & {
  tags: {
    tag: Tag;
  }[];
};

interface PostsByTagGroupResult {
  tag: Partial<Tag>;  
  posts: BlogPostWithTags[];
}

interface ResponseData {
  featuredPosts: BlogPost[];
  tagGroups: PostsByTagGroupResult[];
}

export const handler: Handler = async (event) => {
  return await getNetlifyFunctionHandler<ResponseData>({
    event,
    errorMessage: 'Failed to fetch posts by tag group',
    getQueryResponse: async ({ prisma, event }) => {
      const queryStringParameters = event.queryStringParameters || {};
      const { tagNames, maxItemsPerTag } = queryStringParameters;

      const tagNameCollection = tagNames?.split(',') || [];
      const totalMaxItemsPerTag = parseInt(maxItemsPerTag || '4', 10);

      const [tagGroups, featuredPosts] = await Promise.all([
        Promise.all(tagNameCollection.map(async (tagName) => {
          const posts = await prisma.blogPost.findMany({
            where: { tags: { some: { tag: { name: tagName }}}},
            include: { tags: { include: { tag: true }}},
            orderBy: { createdAt: 'desc' },
            take: totalMaxItemsPerTag
          });

          return {
            tag: posts[0]?.tags[0]?.tag ?? { name: tagName },
            posts: posts as BlogPostWithTags[]
          };
        })),
        prisma.blogPost.findMany({
          where: { featured: true },
          orderBy: { createdAt: 'desc' },
          take: totalMaxItemsPerTag
        })
      ]);

      return { featuredPosts, tagGroups };
    }
  });
};
