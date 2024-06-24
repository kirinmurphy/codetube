import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.blogPost.deleteMany({});

  await prisma.blogPost.create({
    data: {
      title: "Big O Clicks",
      body: "Big O has always been kind of a nebulous concept, I got it around the edges, but it was nver really intuitive. Not until this video.",
      imgUrl: "",
      youtubeId: "BgLTDT03QtU",
    },
  });

  await prisma.blogPost.create({
    data: {
      title: "Supermaven super code completion",
      body: "Just started test driving this new code completion tool called Supermaven.  It's SO fast.  And it's pretty fricken good at guessing.",
      imgUrl: "",
      youtubeId: "JhmdYN1wbG0"
    },
  });

  await prisma.blogPost.create({
    data: {
      title: "Every React 19 Feature Explained in 8 Minutes",
      body: "Very Exciting Stuff",
      imgUrl: "",
      youtubeId: "2NPIYnY3ilo",
    },
  });

  await prisma.blogPost.create({
    data: {
      title: "Signals In JS...",
      body: "full on pub sub in javascript",
      imgUrl: "",
      youtubeId: "vGBBtqPnaUk",
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