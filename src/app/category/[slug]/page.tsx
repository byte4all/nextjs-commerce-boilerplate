import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { ProductGrid } from "~/app/_components/ProductGrid";
import { ManufacturerFilter } from "~/app/_components/ManufacturerFilter";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await db.category.findUnique({
    where: { slug: params.slug },
    include: {
      products: {
        include: {
          manufacturer: true,
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  // Get unique manufacturers that have products in this category
  const manufacturers = await db.manufacturer.findMany({
    where: {
      products: {
        some: {
          categoryId: category.id
        }
      }
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 
        className="text-5xl font-bold mb-8"
        data-text={category.name}
      >
        {category.name}
      </h1>

      <div className="w-full max-w-7xl">
        <ManufacturerFilter 
          manufacturers={manufacturers}
          products={category.products}
        />
      </div>
    </main>
  );
}
