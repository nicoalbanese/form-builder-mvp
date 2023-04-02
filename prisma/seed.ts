import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const nico = await prisma.user.upsert({
    where: { email: "gcalbanese96@gmail.com" },
    update: {},
    create: {
      email: "gcalbanese96@gmail.com",
      name: "Nico",
      Form: {
        create: {
          name: "First Form",
          Block: {
            create: [
              {
                countInOrder: 0,
                question: "What do you think of the BB54?",
                type: "text",
              },
              {
                countInOrder: 1,
                question: "What do you think of the BB41?",
                type: "text",
              },
            ],
          },
        },
      },
    },
  });

  console.log({ nico });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
