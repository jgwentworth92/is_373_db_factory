import { prisma } from '../jest.setup'; // Import prisma from setup file
import { PrismaClient, User, Widget, Purchase } from '@prisma/client';

describe('CRUD operations user', () => {
  
  beforeAll(async () => {
    await prisma.$connect();
  });
  test('Create a new user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
      },
    });
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('test@example.com');
  });

  test('Retrieve a user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
      },
    });
    const userRet = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    expect(userRet).toHaveProperty('id');
    expect(userRet?.email).toBe('test@example.com');
  });

  test('Update a user', async () => {
    // Assuming a user has been created in a previous test or in a `beforeEach` hook
    const user = await prisma.user.create({
      data: {
        email: 'update-test@example.com',
      },
    });

    // Update user's email
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: 'updated-email@example.com',
      },
    });

    expect(updatedUser).toHaveProperty('id', user.id);
    expect(updatedUser.email).toBe('updated-email@example.com');
  });

  test('Delete a user', async () => {
    // Assuming a user has been created in a previous test or in a `beforeEach` hook
    const user = await prisma.user.create({
      data: {
        email: 'delete-test@example.com',
      },
    });

    // Delete the user
    const deletedUser = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    // Trying to retrieve the deleted user should result in null
    const findUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    expect(deletedUser).toHaveProperty('id', user.id);
    expect(findUser).toBeNull();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
});


describe('Purchase model', () => {
  let newUser: User;
  let newWidget: Widget;
  let newPurchase: Purchase;

  beforeAll(async () => {
    newUser = await prisma.user.create({
      data: { email: 'testuser@example.com' },
    });
    newWidget = await prisma.widget.create({
      data: { name: 'Test Widget', creatorId: newUser.id },
    });
  });

  // CREATE
  test('should create a new purchase', async () => {
    const newPurchase = await prisma.purchase.create({
      data: {
        status: 'COMPLETED',
        userId: newUser.id,
        widgetId: newWidget.id,
      },
    });
    expect(newPurchase).toHaveProperty('id');
    expect(newPurchase.status).toBe('COMPLETED');
  });

  // RETRIEVE
  test('should retrieve a purchase', async () => {
    const newPurchase = await prisma.purchase.create({
      data: {
        status: 'COMPLETED',
        userId: newUser.id,
        widgetId: newWidget.id,
      },
    });
    const purchase = await prisma.purchase.findUnique({
      where: { id: newPurchase.id },
    });
    expect(purchase).toHaveProperty('id', newPurchase.id);
  });

  // UPDATE
  test('should update a purchase', async () => {
    const newPurchase = await prisma.purchase.create({
      data: {
        status: 'COMPLETED',
        userId: newUser.id,
        widgetId: newWidget.id,
      },
    });
    const updatedPurchase = await prisma.purchase.update({
      where: { id: newPurchase.id },
      data: { status: 'PENDING' },
    });
    expect(updatedPurchase).toHaveProperty('status', 'PENDING');
  });

  // DELETE
  test('should delete a purchase', async () => {
    const newPurchase = await prisma.purchase.create({
      data: {
        status: 'COMPLETED',
        userId: newUser.id,
        widgetId: newWidget.id,
      },
    });
    const deletedPurchase = await prisma.purchase.delete({
      where: { id: newPurchase.id },
    });
    expect(deletedPurchase).toHaveProperty('id', newPurchase.id);

    const checkPurchase = await prisma.purchase.findUnique({
      where: { id: newPurchase.id },
    });
    expect(checkPurchase).toBeNull();
  });

  afterAll(async () => {
    //remove all purchases and widgets (foreign keys) associated with user first
    await prisma.purchase.deleteMany({ where: { userId: newUser.id } });
    await prisma.widget.deleteMany({ where: { creatorId: newUser.id } });
    await prisma.user.delete({ where: { id: newUser.id } });
    await prisma.$disconnect();
  });
});


describe('Widget model', () => {
  let newUser: User;
  let newWidget: Widget;
  let newPurchase: Purchase;

  beforeAll(async () => {
    newUser = await prisma.user.create({
      data: { email: 'widgetcreator@example.com' },
    });
  });

  // CREATE
  test('should create a new widget', async () => {
    newWidget = await prisma.widget.create({
      data: { name: 'New Widget', creatorId: newUser.id },
    });
    expect(newWidget).toHaveProperty('id');
    expect(newWidget.name).toBe('New Widget');
  });

  // RETRIEVE
  test('should retrieve a widget', async () => {
    const widget = await prisma.widget.findUnique({
      where: { id: newWidget.id },
    });
    expect(widget).toHaveProperty('id', newWidget.id);
  });

  // UPDATE
  test('should update a widget', async () => {
    const updatedWidget = await prisma.widget.update({
      where: { id: newWidget.id },
      data: { name: 'Updated Widget' },
    });
    expect(updatedWidget).toHaveProperty('name', 'Updated Widget');
  });

  // DELETE
  test('should delete a widget', async () => {
    const deletedWidget = await prisma.widget.delete({
      where: { id: newWidget.id },
    });
    expect(deletedWidget).toHaveProperty('id', newWidget.id);

    const checkWidget = await prisma.widget.findUnique({
      where: { id: newWidget.id },
    });
    expect(checkWidget).toBeNull();
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: newUser.id } });
    await prisma.$disconnect();
  });
});
