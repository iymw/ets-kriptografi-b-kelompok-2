import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma";

async function main() {
  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      password: bcrypt.hashSync("password", 8),
    },
  });

  await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      password: bcrypt.hashSync("password", 8),
    },
  });

  await prisma.history.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nominal: "100000",
      asal: "1",
      tujuan: "2",
      userId: 1,
    },
  });

  await prisma.history.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nominal: "100000",
      asal: "2",
      tujuan: "1",
      userId: 2,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
