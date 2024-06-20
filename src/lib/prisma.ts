import { PrismaClient, BlogPost } from "@prisma/client";

const prisma = new PrismaClient()

export default prisma;

export namespace PrismaTypes {
  export type BlogPostProps = BlogPost
  // export type BlogPostCreateInput = Prisma.BlogPostCreateInput
}

