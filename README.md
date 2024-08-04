[blog.codethings.net](https://blog.codethings.net)

Youtube clone built with the new React 19, Next 15, Prisma, Tailwind stack. With server components. Published on Netlify.

## So far 

- Initial page renders with server content.  
- Client side navigation pushes new URL to browser history, which auto streams updates to the UI.  Apparently this works without re-rendering or implementing any specific client side rendering. It's a beautiful thing.  
- Dynamic youtube media player included with multiple page display states, wrangled in Tailwind 
- Server(less) functions to interact with Prisma built for and deployed on Netlify 

## On Deck
- Caching: Exlcusive server based data fetching means conventional client side caching options don't quite fit.  Conceivably we could build a distinct client side fetching layer with react-query/SWR/etc, or add server side Redis or node-cache.  Obv client side caching will be most performant and least chatty on the network, but also a bigger undertaking, so we'll do server side first.    
- Authentication:  Next big step is integrating an auth flow with server components and using server actions to manage form submission.  Still researching options including NextAuth and Lucia. 
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
