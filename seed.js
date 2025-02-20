import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add slug generator helper function
const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

// Add this helper function at the top
const getRandomRatings = (productId) => {
  const loremDescriptions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    "Duis aute irure dolor in reprehenderit in voluptate velit.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa."
  ];

  return Array.from({ length: 5 }, (_, i) => ({
    score: Math.floor(Math.random() * 5) + 1, // Random score between 1-5
    description: loremDescriptions[i],
    productId: productId
  }));
};

async function main() {
  // Clean the database first
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.manufacturer.deleteMany();

  // Create categories with slugs
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Bodywash',
        slug: generateSlug('Bodywash'),
        icon: '/img/soaps.webp',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Shampoo',
        slug: generateSlug('Shampoo'),
        icon: '/img/categories/shampoo.webp',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Towels',
        slug: generateSlug('Towels'),
        icon: '/img/categories/towel.webp',
      },
    }),
  ]);

  // Create manufacturers
  const manufacturers = await Promise.all([
    prisma.manufacturer.create({
      data: {
        name: 'Head & Shoulders',
        logo: '/img/logos/placeholderLogo.webp',
      },
    }),
    prisma.manufacturer.create({
      data: {
        name: 'Pantene',
        logo: '/img/logos/placeholderLogo.webp',
      },
    }),
    prisma.manufacturer.create({
      data: {
        name: 'Kiwi',
        logo: '/img/logos/placeholderLogo.webp',
      },
    }),
  ]);

  // Create products for each category and manufacturer
  const getRandomPrice = (min, max) => 
    Math.round((Math.random() * (max - min) + min) * 100) / 100;

  // Create Shampoo and Bodywash products for Head & Shoulders and Pantene
  for (const manufacturer of manufacturers.slice(0, 2)) {
    // Create 4 shampoos
    for (let i = 1; i <= 4; i++) {
      const product = await prisma.product.create({
        data: {
          name: `Shampoo ${i}`,
          description: `A great shampoo from ${manufacturer.name}`,
          price: getRandomPrice(10, 50),
          stock: 100,
          image: '/img/products/placeholderItem.webp',
          categoryId: categories[1].id, // Shampoo category
          manufacturerId: manufacturer.id,
        },
      });

      // Add ratings for this product
      await prisma.rating.createMany({
        data: getRandomRatings(product.id)
      });

      // Create 4 bodywashes
      const bodywash = await prisma.product.create({
        data: {
          name: `Bodywash ${i}`,
          description: `A refreshing bodywash from ${manufacturer.name}`,
          price: getRandomPrice(10, 50),
          stock: 100,
          image: '/img/products/placeholderItem.webp',
          categoryId: categories[0].id, // Bodywash category
          manufacturerId: manufacturer.id,
        },
      });

      // Add ratings for this product
      await prisma.rating.createMany({
        data: getRandomRatings(bodywash.id)
      });
    }
  }

  // Create Towel products for Kiwi
  const towelColors = ['Blue', 'Red', 'White', 'Beige'];
  for (const color of towelColors) {
    const towel = await prisma.product.create({
      data: {
        name: `Towel ${color}`,
        description: `A soft and absorbent ${color.toLowerCase()} towel`,
        price: getRandomPrice(50, 100),
        stock: 100,
        image: '/img/products/placeholderItem.webp',
        categoryId: categories[2].id, // Towels category
        manufacturerId: manufacturers[2].id, // Kiwi manufacturer
      },
    });

    // Add ratings for this product
    await prisma.rating.createMany({
      data: getRandomRatings(towel.id)
    });
  }

  console.log('Database has been seeded! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
