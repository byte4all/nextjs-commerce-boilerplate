import { CartItems } from "~/app/_components/CartItems";
import { CartSummary } from "~/app/_components/CartSummary";

export default function CartPage() {
  return (
    <main className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <CartItems className="flex-[3]" />
          <CartSummary className="flex-[2]" />
        </div>
      </div>
    </main>
  );
}
