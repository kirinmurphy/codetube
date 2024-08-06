[blog.codethings.net](https://blog.codethings.net)

Youtube UI clone built with the new React 19, Next 15, Prisma, Tailwind stack. With server components. Published on Netlify.

## So far 

- Initial page renders with server content.  
- Client side navigation pushes new URL to browser history, which auto streams updates to the UI.  Turns out this works without re-rendering or implementing any specific client side rendering. It's a beautiful thing.  Except for caching.  Now what?
- Dynamic youtube media player included with multiple page display states, wrangled in Tailwind 
- Server(less) functions to interact with Prisma built for and deployed on Netlify 

## On Deck
- Caching: Exlcusive server based data fetching obviously means common client side caching options don't quite fit.  What are our options here?  https://claude.ai/chat/7987126e-c335-4e3e-bb51-e8c641062782
- Authentication:  Next step is integrating an auth flow with server components and using server actions to manage form submission.  Still researching options including NextAuth and Lucia. 
- Persisting user state across sessions.  

## To Run
install netlify cli
```
yarn global add netlify-cli
```

add seed data and run migrations
```
yarn run seed:dev
```

compile server functions 
```
yarn run compileServerFunctions
```

start dev server
```
netlify dev                       
```
