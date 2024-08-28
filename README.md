# Auth Simplified

If you are going to create a full-stack web app that requires authentication using Nextjs, this may be the repository for you.

-   Main Auth logic is implemented by Lucia Auth. As their documentation is severely lacking at the moment, you can use this repo as a reference. Validation library used is Zod.
-   It uses Next.js with its server actions, so the auth logic stays on server.
-   Drizzle ORM is used, so the db queries are close to native SQL syntax, which makes it more approachable to beginners.
-   Github Actions are configured for CI/CD, it will create a Neon Postgres DB branch in every Pull Request(PR), deploy the project to Vercel and run a Playwright test suite. After PR merge, it deletes the Neon DB branch. Same steps are also used for production deployment.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

# Notes

## Needed Github Actions Secrets

-   NEON_API_KEY
-   PROD_DATABASE_URL
    -   Production DB url From Neon, use pooled option for serverless environments.
-   VERCEL_TOKEN

## Implementation notes

-   DB name in neon is assumed as neondb
-   While Developing Locally, you should manually create a neondb branch and set its DATABASE_URL environment variable

## creating the Next.js project

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

## drizzle 

Drizzle ORM is implemented, DB service used is Neon DB.

We define db object in src/lib/db/index.ts with  

## setting vscode debugging

Setting up nextjs debugging with obvious means on the web has failed me, especially when using turbopack for debugging, the script I found that works resides in .vscode/launch.json

## Prototyping components

prototype_components route is used to prototype components before implementing them in app logic.

## Playwright End2End Testing

-   Can be used in VSCode or during Preview and Production deployments.
-   Defaults to localhost:3000 if PREVIEW_URL environment variable is not found

# Auth

-   **index.ts**
        -   Drizzle ORM DB connection
        -   exposed User columns settings
            -   Add user columns you want to get with getUsers to getUserAttributes,and DatabaseUserAttributes
        -   Session lifetimes can be set in index.ts: https://lucia-auth.com/basics/sessions
-   **SignupAction.ts**
        -   Zod validation of username and password formats
        -   forbid duplicate usernames
        -   Hash the pass using argon2
        -   generate unique userId
        -   save to db
        -   login user using perform_login()
        -   redirect to "/"
        -   returns the first error message to the calling form
        -   default user role is set in drizzle schema
-   **LoginAction.ts**
        -   Contains server action and login script: perform_login()
        -   Validate username and password formattings with Zod.
        -   perform_login()
            -   take username and pass
            -   check if username exists, return error if not. login throttling needed in production apps to prevent brute force username exploration.
            -   Hash pass, check if the hashed password match with the one in db. if not, return error.
            -   If password valid, create session and sessionCookie.
            -   redirect "/"
-   **ValidateCookies.ts - getUser()**
    -   From the cookies in http request, get the session key, if not exist, return null
    -   call lucia.validateSession(), this validates the session, if its valid, has valid cookie and not past expiration, returns valid user and session. 
    -   if the returns are [null, null], create a new session and sessionCookie
    -   if the returns are valid, extend session/sessionCookie
    -   if returns are valid, return user
-   **LogOut.ts**
    -   gets the cookies from http request
    -   if invalid, returns invalid session error
    -   if valid, invalidates the session, which logs out the user.
    -   creates new session and sessionCookie
    -   redirect "/"
-   **AuthArgon2Config.ts**: Argon2 security settings that is reached by LoginAction and SignupAction for hashing passwords.
-   **AuthZodStrings.ts**: zod string objects for string validations such as username and password. stored here so all scripts can access the same validation schemas.  
-   **Drizzle Schema**: contains userTable and SessionTable for Lucia Auth. Default values such as user role = "normal" are defined here.

## AddAdmin.ts CLI script

You can run it by
```
pnpm i -g tsx
tsx .\src\scripts\AddAdmin.ts
```
it requires the connection url given by neondb.


# TODO

-   write end to end tests for diff login combs, fail expectations
-   login throttling
    -   username and password based
    -   ip based
    -   captcha