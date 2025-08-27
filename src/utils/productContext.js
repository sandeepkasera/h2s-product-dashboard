import { createContext, useContext, useState } from "react";
import { generateMockProducts } from "./mockData";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  // ✅ generate products once
  const [products, setProducts] = useState(() => generateMockProducts());

  // ---- CRUD operations ----
  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, { id: Date.now(), ...newProduct }]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProductById = (id) => products.find((p) => p.id === id);

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
