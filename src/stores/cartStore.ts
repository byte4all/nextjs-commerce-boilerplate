import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (id, quantity) => set((state) => {
        const existingItem = state.items.find(item => item.id === id);
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        }
        return { items: [...state.items, { id, quantity }] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) {
          return {
            items: state.items.filter(item => item.id !== id)
          };
        }
        return {
          items: state.items.map(item =>
            item.id === id
              ? { ...item, quantity }
              : item
          ),
        };
      }),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
