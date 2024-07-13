// import { Handler } from '@netlify/functions';
// import { fetchBlogPosts } from '../../src/lib/fetchBlogPosts';

// const handler: Handler = async (event, context) => {
//   const tag = event.queryStringParameters?.tag;

//   try {
//     const blogPosts = await fetchBlogPosts({ tag });
//     return {
//       statusCode: 200,
//       body: JSON.stringify(blogPosts),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Error fetching blog posts' }),
//     };
//   }
// };

// export { handler };
