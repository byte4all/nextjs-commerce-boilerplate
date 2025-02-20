"use client";

import { Manufacturer, Product } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { ProductGrid } from "./ProductGrid";
import { X } from "lucide-react";

interface ManufacturerFilterProps {
  manufacturers: Manufacturer[];
  products: (Product & { manufacturer: Manufacturer })[];
}

export function ManufacturerFilter({ manufacturers, products }: ManufacturerFilterProps) {
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);

  const filteredProducts = selectedManufacturers.length > 0
    ? products.filter(p => selectedManufacturers.includes(p.manufacturerId))
    : products;

  const toggleManufacturer = (manufacturerId: string) => {
    setSelectedManufacturers(prev =>
      prev.includes(manufacturerId)
        ? prev.filter(id => id !== manufacturerId)
        : [...prev, manufacturerId]
    );
  };

  const clearFilters = () => {
    setSelectedManufacturers([]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow overflow-x-auto scrollbar-thin">
        {manufacturers.map((manufacturer) => (
          <button
            key={manufacturer.id}
            onClick={() => toggleManufacturer(manufacturer.id)}
            className={`flex items-center space-x-2 min-w-max px-4 py-3 rounded-lg transition-colors
              ${selectedManufacturers.includes(manufacturer.id)
                ? 'bg-cyan-100 text-cyan-700'
                : 'hover:bg-cyan-100'
              }`}
          >
            <Image
              src={manufacturer.logo}
              alt={manufacturer.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-medium">{manufacturer.name}</span>
          </button>
        ))}
        {selectedManufacturers.length > 0 && (
          <button
            onClick={clearFilters}
            className="ml-auto min-w-max p-2 hover:bg-cyan-100 rounded-full"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        )}
      </div>

      <ProductGrid products={filteredProducts} />
    </div>
  );
}
