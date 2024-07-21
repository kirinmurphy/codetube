[blog.codethings.net](https://blog.codethings.net)

Test driving the new React 19, Next 15, Prisma, Tailwind stack. With server components. Published on Netlify.

## So far 

- initial page renders with server content, with client side navigation / filtering taking over once loaded
- media player built with react-youtube, with dynamic multi-display state wrangled in Tailwind 
- server(less) functions using prisma delployed on netlify


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
