import prisma from "./prismaClient";
import seedData from "./seedData.json";

async function main() {
  await prisma.blogPost.deleteMany({});

  for (const post of seedData) {
    await prisma.blogPost.create({ data: post });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
