import { Prisma } from "@prisma/client";
import prisma from "./prisma";

interface GetBlogPostQueryParams {
  tag?: string;
}

export async function fetchBlogPosts ({ tag }: GetBlogPostQueryParams) {

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
