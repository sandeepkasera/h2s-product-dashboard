import React from "react";
import { useCart } from "../utils/cartContext"; // adjust path if needed

export default function CartPage() {
  const { state, api, total, count } = useCart();

  const items = [...state.items.values()]; // convert Map → array

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Your Cart is Empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {/* Table of items */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ product, qty }) => (
              <tr key={product.id} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <span>{product.name}</span>
                </td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3 flex items-center gap-2 justify-center">
                  <button
                    onClick={() => api.dec(product.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{qty}</span>
                  <button
                    onClick={() => api.inc(product.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </td>
                <td className="p-3">₹{(product.price * qty).toFixed(2)}</td>
                <td className="p-3">
                  <button
                    onClick={() => api.remove(product.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Total Items: {count}</p>
          <p className="text-lg font-semibold">Total Price: ₹{total.toFixed(2)}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={api.clear}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Cart
          </button>
          <button
            onClick={() => alert("Proceeding to checkout...")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
