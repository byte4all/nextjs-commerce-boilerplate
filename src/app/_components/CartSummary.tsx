'use client';

import { useCartStore } from "~/stores/cartStore";
import { useProducts } from "~/hooks/useProducts";

const DELIVERY_COST = 3;
const TAX_RATE = 0.1;

interface CartSummaryProps {
  className?: string;
}

export function CartSummary({ className = "" }: CartSummaryProps) {
  const { items } = useCartStore();
  const validItems = items.filter(item => item.quantity > 0);
  const { products } = useProducts(validItems.map(item => item.id));

  const subtotal = products.reduce((acc, product) => {
    const quantity = items.find(item => item.id === product.id)?.quantity ?? 0;
    return acc + (product.price * quantity);
  }, 0);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + (subtotal > 0 ? DELIVERY_COST : 0);

  return (
    <div className={`${className}`}>
      <div className="sticky top-24 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>${subtotal > 0 ? DELIVERY_COST.toFixed(2) : '0.00'}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <input
            type="text"
            placeholder="Enter your coupon code"
            className="w-full px-4 py-2 border border-cyan-500 rounded-3xl mt-4"
            disabled={subtotal === 0}
          />

          <button 
            className={`w-full py-3 rounded-3xl transition-colors ${
              subtotal > 0 
                ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={subtotal === 0}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
