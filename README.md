# Seeding & Factory Tutorial

## Overview
This README explains how to populate your database with fake data using Prisma and @faker-js/faker. The seed.ts script creates random users, widgets, and purchases, demonstrating a practical example of seeding a database in a development environment.

### Seeding Process
- Random Users: The script generates random user data. Each user has a unique email address.
- Random Widgets: For each user, the script creates 1 to 5 widgets. Each widget has a name and is linked to the creator's ID.
- Random Purchases: Each widget created is associated with 1 to 3 purchase records. These records include a transaction ID, purchase date, and the IDs of the user and widget involved.

### seed.ts Breakdown
- seed.ts script uses @faker-js/faker for generating fake data.
- It creates random users, widgets, and purchases, linking them as per your data model.
- The script uses async-await for handling asynchronous operations.
- Prisma's client is used to interact with your database, creating entries in your tables.

## Getting Started

### Clone Repository
`git clone https://github.com/jgwentworth92/is_373_db_factory.git`

### Install Dependencies
Install all necessary packages defined in package.json.
<br>`npm install`
<br>

### Set up Environment
Set up your testing and production environments by creating .env.test and .env files in the root directory. These files define the database URLs for different environments.

#### Test Environment
Set up the testing environment `.env.test`
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
Generate the Prisma client to interact with the database. This step is automated in package.json under postinstall, so it runs automatically after npm install.
<br>`npx prisma generate`

## Setting Up the Database with Prisma

### Create Database Schema
Create or update the database schema
<br>`npm run db:push`

### Seed the database
Seed the database with fake data using the Prisma seed script. This command utilizes the @faker-js/faker package for generating fake data and prisma-factory for seeding.
<br>`npm run seed`

## Running Tests
Execute the tests using Jest. The testing setup is defined in package.json under the test script.
<br>`npm run test`

### Start the Development Server
Start the Next.js development server. The server will run on http://localhost:3000:
`npm run dev`

The application should now be running on http://localhost:3000.
