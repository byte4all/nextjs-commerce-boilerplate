'use client';

import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "~/stores/cartStore";
import { QuantitySelector } from "./QuantitySelector";
import { useProducts } from "~/hooks/useProducts";
import Link from "next/link";

interface CartItemsProps {
  className?: string;
}

export function CartItems({ className = "" }: CartItemsProps) {
  const { items, removeItem } = useCartStore();
  // Filter valid items first
  const validItems = items.filter(item => item.quantity > 0);
  const { products, isLoading } = useProducts(validItems.map(item => item.id));
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Don't even attempt to load if there are no valid items
  if (validItems.length === 0) {
    return (
      <div className={`${className} bg-white rounded-lg shadow-sm p-8 flex flex-col items-center justify-center`}>
        <p className="text-gray-500 text-xl mb-6">Your cart is empty!</p>
        <Link 
          href="/"
          className="px-8 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Dive In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`${className} bg-white rounded-lg shadow-sm p-8`}>
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500" />
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {products.map((product) => {
        const cartItem = validItems.find(item => item.id === product.id);
        if (!cartItem) return null;

        return (
          <div
            key={product.id}
            className={`flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm transition-all
              ${removingId === product.id ? 'animate-border-shine-red' : ''}`}
          >
            <button
              onClick={() => handleRemove(product.id)}
              className="p-2 hover:bg-red-50 rounded-full transition-colors"
            >
              <X className="text-red-500" size={20} />
            </button>

            <Image
              src={product.manufacturer.logo}
              alt={product.manufacturer.name}
              width={40}
              height={40}
              className="rounded-full object-contain"
            />

            <div className="flex-grow">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">${product.price.toFixed(2)} each</p>
            </div>

            <QuantitySelector productId={product.id} />

            <div className="text-lg font-medium min-w-[80px] text-right">
              ${(product.price * cartItem.quantity).toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
