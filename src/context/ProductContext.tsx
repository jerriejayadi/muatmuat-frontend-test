"use client";
import { createContext, useContext, useState } from "react";

export interface ProductsProps {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface ProductContextProps {
  products: ProductsProps[];
  setProducts: (products: ProductsProps[]) => void;
}

export const ProductContext = createContext<ProductContextProps | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductsProvider() {
  const productContext = useContext(ProductContext);
  if (!productContext) {
    throw new Error(
      "useProductsProvider must be used within a ProductProvider"
    );
  }
  return productContext;
}
