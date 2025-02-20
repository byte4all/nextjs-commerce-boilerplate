import { useEffect, useState } from 'react';
import { Product, Manufacturer } from '@prisma/client';
import { useCart } from './useCart';

export function useProducts(ids: string[]) {
  const [products, setProducts] = useState<(Product & { manufacturer: Manufacturer })[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Don't fetch if there are no valid IDs
    if (!ids || ids.length === 0 || ids.every(id => !id)) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    // Filter out empty IDs
    const validIds = ids.filter(Boolean);

    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?ids=${validIds.join(',')}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProducts();
  }, [ids.join(',')]); // Only depend on the joined string of IDs

  return { products, isLoading };
}
