import prisma from "./prisma";

export interface TagWithCount {
  id: number;
  name: string;
  readableName: string;
  count: number;
}

export async function fetchTagsFacet(): Promise<TagWithCount[]> {
  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  return tags
    .map(tag => ({
      id: tag.id,
      name: tag.name,
      readableName: tag.name.replace(/_/g, ' '),
      count: tag._count.posts,
    }))
    .sort((a, b) => b.count - a.count);
}
