import React, { createContext, useContext, useMemo, useReducer } from "react";
 
const CartContext = createContext();
 
const initialState = {
  items: new Map(), // key: product.id, value: { product, qty }
};
 
function reducer(state, action) {
  const items = new Map(state.items);
 
  switch (action.type) {
    case "ADD": {
      const { product } = action;
      console.log('product', product);
     
      const existing = items.get(product.id);
      if (existing) {
        items.set(product.id, { product, qty: existing.qty + 1 });
      } else {
        items.set(product.id, { product, qty: 1 });
      }
      return { ...state, items };
    }
 
    case "INC": {
      const { id } = action;
      const entry = items.get(id);
      if (entry) items.set(id, { ...entry, qty: entry.qty + 1 });
      return { ...state, items };
    }
 
    case "DEC": {
      const { id } = action;
    //   console.log('id', product.id);
     
      const entry = items.get(id);
      console.log('entry', entry);
     
      if (entry) {
        const nextQty = entry.qty - 1;
        if (nextQty <= 0) items.delete(id);
        else items.set(id, { ...entry, qty: nextQty });
      }
      return { ...state, items };
    }
 
    case "REMOVE": {
      items.delete(action.id);
      return { ...state, items };
    }
 
    case "CLEAR": {
      return { ...state, items: new Map() };
    }
 
    default:
      return state;
  }
}
 
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
 
  // ✅ Expose API functions for components
  const api = useMemo(
    () => ({
      add: (product) => dispatch({ type: "ADD", product }),
      inc: (id) => dispatch({ type: "INC", id }),
      dec: (id) => dispatch({ type: "DEC", id }),
      remove: (id) => dispatch({ type: "REMOVE", id }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    []
  );
 
  const count = [...state.items.values()].reduce((sum, it) => sum + it.qty, 0);
  const total = [...state.items.values()].reduce(
    (sum, it) => sum + it.product.price * it.qty,
    0
  );
 
  const value = useMemo(() => ({ state, api, count, total }), [state, api, count, total]);
 
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
 
// ✅ Custom hook
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
 