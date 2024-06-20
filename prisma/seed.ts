import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.blogPost.deleteMany({});

  await prisma.blogPost.create({
    data: {
      title: "Big O Finally Clicks",
      body: "Big O has always been kind of a nebulous concept, I got it around the edges, but it was nver really intuitive. Not until this video.",
      imgUrl: "https://www.ggorantala.dev/content/images/2023/05/Big-O-Notation.png",
      sourceLink: "https://www.youtube.com/watch?v=BgLTDT03QtU"
    },
  });

  await prisma.blogPost.create({
    data: {
      title: "Supermaven super code completion",
      body: "Even better code completion than Copilot. Turns out there's still some room for the littly guy.",
      imgUrl: "/images/thumbs/thumb_supermaven.png",
      sourceLink: "https://supermaven.com/"
    },
  });
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