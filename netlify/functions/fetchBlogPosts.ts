import type { Context } from "@netlify/functions";

function hello (req: Request, context: Context) { 
  console.log('request', req);
  console.log('context', context);
  return new Response("Hello, world!")
}

export default hello;
