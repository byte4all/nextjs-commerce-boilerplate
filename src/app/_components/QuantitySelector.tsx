"use client";

import { Plus, Minus } from "lucide-react";
import { useCartStore } from "~/stores/cartStore";

interface QuantitySelectorProps {
  productId: string;
  initialQuantity?: number;
  onAnimationTrigger?: () => void;
}

export function QuantitySelector({ productId, initialQuantity, onAnimationTrigger }: QuantitySelectorProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const currentItem = items.find(item => item.id === productId);
  const quantity = currentItem?.quantity ?? 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (quantity === 0 && newQuantity === 1) {
      addItem(productId, 1);
      onAnimationTrigger?.();
    } else if (newQuantity === 0) {
      // This will trigger the removal through the updateQuantity logic
      updateQuantity(productId, 0);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <>
      {quantity === 0 ? (
        <div className="bubble-text">
          <button 
            onClick={() => handleQuantityChange(1)}
            className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition-colors relative"
          >
            <Plus className="text-white" size={20} />
          </button>
        </div>
      ) : (
        <div className="inline-flex items-center h-10 rounded-full bg-cyan-500 px-3">
          <button 
            onClick={() => handleQuantityChange(Math.max(0, quantity - 1))}
            className="text-white hover:opacity-80 flex items-center justify-center"
          >
            <Minus size={16} />
          </button>
          <span className="mx-3 text-white font-medium min-w-[20px] text-center">
            {quantity}
          </span>
          <button 
            onClick={() => handleQuantityChange(quantity + 1)}
            className="text-white hover:opacity-80 flex items-center justify-center"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </>
  );
}
