"use client";

import { Category } from "@prisma/client";
import { CategoryCard } from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="w-full overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-100">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
