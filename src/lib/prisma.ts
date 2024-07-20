import { PrismaClient, BlogPost } from "@prisma/client";

const prisma = new PrismaClient()

export default prisma;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PrismaTypes {
  export type BlogPostProps = BlogPost
}
