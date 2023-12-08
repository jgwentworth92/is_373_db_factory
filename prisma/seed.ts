// seeder.ts
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createRandomUser() {
  return prisma.user.create({
    data: {
      email: faker.internet.email(),
      // Additional fields here as needed.
    },
  });
}

async function createRandomWidget(creatorId: string) {
  return prisma.widget.create({
    data: {
      name: faker.commerce.productName(),
      creatorId: creatorId,
      // Additional fields here.
    },
  });
}

async function createRandomPurchase(userId: string, widgetId: string) {
  return prisma.purchase.create({
    data: {
      status: "pending",
      transactionId: faker.string.uuid(),
      purchaseDate: faker.date.past(),
      userId: userId,
      widgetId: widgetId,
      // Additional fields here.
    },
  });
}

async function main() {
  const numberOfUsers = 10;

  for (let i = 0; i < numberOfUsers; i++) {
    const user = await createRandomUser();
    const numberOfWidgets = faker.number.int({ min: 1, max: 5 });

    for (let j = 0; j < numberOfWidgets; j++) {
      const widget = await createRandomWidget(user.id);
      const numberOfPurchases = faker.number.int({ min: 1, max: 3 });

      for (let k = 0; k < numberOfPurchases; k++) {
        await createRandomPurchase(user.id, widget.id);
      }
    }
  }
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
