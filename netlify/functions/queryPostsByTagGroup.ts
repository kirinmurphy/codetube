import { Handler } from "@netlify/functions";
import { BlogPost, Tag } from "@prisma/client";
import { getNetlifyFunctionHandler } from "../utils/getNetlifyFunctionHandler";

type BlogPostWithTags = BlogPost & {
  tags: {
    tag: Tag;
  }[];
};

interface PostsByTagGroupResult {
  tag: Partial<Tag>;  // Changed to Partial<Tag> to allow for tags without an id
  posts: BlogPostWithTags[];
}

export const handler: Handler = async (event) => {
  return await getNetlifyFunctionHandler<PostsByTagGroupResult[]>({
    event,
    errorMessage: 'Failed to fetch posts by tag group',
    getQueryResponse: async ({ prisma, event }) => {
      const tagNames = event.queryStringParameters?.tagNames?.split(',') || [];
      const maxItemsPerTag = parseInt(event.queryStringParameters?.maxItemsPerTag || '4', 10);
    
      return await Promise.all(tagNames.map(async (tagName) => {
        const posts = await prisma.blogPost.findMany({
          where: {
            tags: {
              some: {
                tag: {
                  name: tagName
                }
              }
            }
          },
          include: {
            tags: {
              include: {
                tag: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: maxItemsPerTag
        });
    
        return {
          tag: posts[0]?.tags[0]?.tag ?? { name: tagName },
          posts: posts as BlogPostWithTags[] || []
        };
      }));    
    }
  });
};
