import prisma from "./prismaClient";
import seedData from "./seedData.json";

async function main() {
  await prisma.blogPostTag.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.tag.deleteMany({});

  const tagMap = new Map();

  for (const post of seedData) {
    const { tags, ...postWithoutTags } = post;
    const createdPost = await prisma.blogPost.create({
      data: postWithoutTags,
    })

    for (const tagName of tags) {
      if (!tagMap.has(tagName)) {
        const createdTag = await prisma.tag.create({
          data: { name: tagName },
        })
        tagMap.set(tagName, createdTag.id)
      }

      await prisma.blogPostTag.create({
        data: {
          blogPostId: createdPost.id,
          tagId: tagMap.get(tagName),
        },
      })
    }
  }
}

main()
  .catch(e => { 
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
