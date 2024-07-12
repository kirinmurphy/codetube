import prisma from "./prisma";

interface TagWithCount {
  id: number;
  name: string;
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

  return tags.map(tag => ({
    id: tag.id,
    name: tag.name,
    count: tag._count.posts,
  }));
}
