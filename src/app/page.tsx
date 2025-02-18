import Link from "next/link";
import { HeroCarousel } from "~/app/_components/HeroCarousel";
import { ProductGrid } from "~/app/_components/ProductGrid";
import { db } from "~/server/db";

export default async function Home() {
  const products = await db.product.findMany({
    take: 6,
    orderBy: {
      ratings: {
        _count: 'desc'
      }
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroCarousel />
      
      <section className="w-full max-w-7xl px-4 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Best Sellers</h2>
          <p className="text-gray-500 mb-12">
            Take a look at our highest rated products. We can assure you, they don't disappoint.
          </p>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
