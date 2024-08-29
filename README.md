[blog.codethings.net](https://blog.codethings.net)

Youtube UI clone written in the new React 19, Next 15 stack. 
- Backend built with React Server Components, Prisma, Memcache, deployed with Netlify serverless functions. 
- Styled with Tailwind.

## So far 

- Initial page renders with server content.  
- Client side navigation pushes new URL to browser history, which auto streams new fetched data to the UI.  Turns out this works without re-rendering or implementing any specific client side rendering. It's a beautiful thing.  Except for caching.  Is there even a way to client side cache anymore in this cinematic universe? 
- Database queries cached in memcache, cleared when seeding.  
- Server(less) functions to interact with Prisma built for and deployed on Netlify 
- Dynamic youtube media player included with multiple page display states, wrangled in Tailwind 

## On Deck
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
