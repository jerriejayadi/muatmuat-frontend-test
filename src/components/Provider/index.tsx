"use client";

import { ProductProvider } from "@/context/ProductContext";

export default function Provider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <ProductProvider>{children}</ProductProvider>;
}
