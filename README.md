# Auth Simplified
If you need a simple auth solution for your Next.js projects that you can easily understand and customize, this is your repo.
-   Main Auth logic is implemented by Lucia Auth. As their documentation is severely lacking at the moment, you can use this repo as a reference.
-   It uses Next.js with its server actions, so the auth logic stays on server.
-   Drizzle ORM is used, so the db queries are close to native SQL syntax, which makes it more approachable to beginners.
-   Customized to use supabase as database provider, but the Drizzle ORM settings can be changed to support other db providers.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

# Steps used to create this repo

## create Next.js project

Next 15 is currently a RC(Release candidate)
```
pnpx create-next-app@rc
```

Then some bulk from /src/app/page.tsx, layout.tsx and globals.css is removed.

## drizzle 

### w supabase

## shadcn

## setting vscode debugging

## creating and testing components