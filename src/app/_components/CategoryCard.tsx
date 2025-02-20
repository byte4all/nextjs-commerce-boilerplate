"use client";

import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/category/${category.slug}`}
      className="group relative w-full h-64 rounded-lg overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${category.icon})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="wave-text text-white text-4xl font-bold mb-2" data-text={category.name}>
          {category.name}
        </h3>
        <button className="bg-white text-cyan-500 px-6 py-2 rounded-full hover:bg-cyan-50 transition-colors">
          Shop Now
        </button>
      </div>
    </Link>
  );
}
