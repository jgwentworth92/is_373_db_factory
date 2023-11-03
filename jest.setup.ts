//to setup/cleanup testdb
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export { prisma };
