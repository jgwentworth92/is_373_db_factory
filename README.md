# Seeding & Factory Tutorial
## Getting Started

### Clone Repository
`git clone https://github.com/jgwentworth92/is_373_db_factory.git`

### Install Dependencies
`npm install`

### Set up Environment
#### Test Environment
Set up testing environment by creating `.env.test` file in the root directory
```dotenv
DATABASE_URL="file:./test.db.sqlite"
```
#### Production Environment
Set up the production database in `.env`
```dotenv
DATABASE_URL="file:.prod/db.sqlite"
```
or, if you have a live database:
```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```
### Initialize Prism
Initialize your Prisma setup by generating the Prisma client:
`npx prisma generate`

## Setting Up the Database with Prisma
### Create Database Schema
Run: `npx prisma migrate dev --name init`

### Generate the test data
Run: `npx prisma generate`

### Seed the database
Run: `npx prisma db seed -- --environment development`

## Running Tests
Execute the test command: `npm run test`

### Start the Development Server
Run the Next.js development using the following command:
`npm run dev`

The application should now be running on http://localhost:3000.


# T3 App Info

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
