import { Prisma } from "@prisma/client";

interface GetBlogPostQueryParams {
  tag?: string;
}

export function getBlogPostQuery ({ tag }: GetBlogPostQueryParams): Prisma.BlogPostFindManyArgs {
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

  return tag ? getItemsByTagQuery : getAllItemsQuery
}
