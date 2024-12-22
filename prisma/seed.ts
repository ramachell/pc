import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

const userData = [
  {
    name: 'Jin',
    email: 'jin@email.com',
    posts: {
      create: [
        {
          title: '집에서 쫒겨난 Jin의 폴바셋 탐험기 with 딸기 아포가토',
          content: '맛있었다',
          published: true,
        },
      ],
    },
  },
] satisfies Prisma.UserCreateInput[]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
