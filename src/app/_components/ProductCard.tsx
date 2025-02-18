"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { QuantitySelector } from "./QuantitySelector";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleQuantityChange = (quantity: number) => {
    if (quantity === 1) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1500);
    }
  };

  return (
    <Link 
      href={`/products/${product.id}`}
      className={`w-72 p-4 flex flex-col rounded-lg border-2 border-cyan-500 transition-all duration-300 
        hover:scale-105 hover:shadow-lg relative overflow-hidden cursor-pointer
        ${isAnimating ? 'animate-border-shine' : ''}`}
      style={{ isolation: 'isolate' }}
    >
      <div className="relative h-48 mb-4 group">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg hover:text-cyan-600 transition-colors">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.description}</p>
        
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
          <div 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="z-10"
          >
            <QuantitySelector onQuantityChange={handleQuantityChange} />
          </div>
        </div>
      </div>
    </Link>
  );
}
