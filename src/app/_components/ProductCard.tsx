"use client";

import { Manufacturer, Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { QuantitySelector } from "./QuantitySelector";

interface ProductCardProps {
  product: Product & { manufacturer: Manufacturer };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimationTrigger = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1500);
  };

  return (
    <div className={`w-72 p-4 flex flex-col rounded-lg transition-all duration-300 shadow-md
      relative overflow-hidden
      ${isAnimating ? 'animate-border-shine' : ''}`}
      style={{ isolation: 'isolate' }}
    >
      <Link 
        href={`/products/${product.id}`}
        className="group cursor-pointer"
      >
        <div className="relative h-48 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform group-hover:scale-105"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg hover:text-cyan-600 transition-colors">
            {product.name}
          </h3>
          <Image
            src={product.manufacturer.logo}
            alt={product.manufacturer.name}
            width={24}
            height={24}
            className="rounded-full object-contain"
          />
        </div>
        <p className="text-gray-500 text-sm">{product.description}</p>
      </Link>

      <div className="flex items-center justify-between mt-2">
        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
        <QuantitySelector 
          productId={product.id}
          onAnimationTrigger={handleAnimationTrigger}
        />
      </div>
    </div>
  );
}
