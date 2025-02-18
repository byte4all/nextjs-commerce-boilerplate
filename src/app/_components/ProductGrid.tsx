"use client";

import { Product } from "@prisma/client";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="w-full overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-100">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
