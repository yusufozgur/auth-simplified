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

## shadcn
```
pnpm create next-app@latest my-app --typescript --tailwind --eslint
```
All default options

```
pnpm dlx shadcn-ui@latest add button card input label
```

## component testing

/test_components route can be used to develop and test components before implementing them in app logic

## drizzle 

```
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit
```

note, in order to use db.query.tablename notation, 
    make a /db/index.ts like this:
```
import * as schema from './schema';
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.DATABASE_URL
const client = postgres(connectionString!, { prepare: false })
const db = drizzle(client, { schema });
```

### w supabase

## setting vscode debugging

## creating and testing components

## lucia auth/index.ts db adapter

## lucia user column

## add a admin adder cli script


## Playwright
## write end to end tests for diff login combs



# TODO


## login throttling
### username and password based
### ip based
### captcha