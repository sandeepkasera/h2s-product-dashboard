import React, { useState } from "react";
import { useCart } from "../utils/cartContext";
import { generateMockProducts } from "../utils/mockData";

export default function DashboardLayout() {
  const [products] = useState(generateMockProducts(200)); // demo 200 products
  const { count } = useCart();

  // 🔹 Stats
  const totalProducts = products.length;
  const totalRevenue = products.reduce(
    (sum, p) => sum + Number(p.price) * (p.stock / 2), // fake revenue
    0
  );
  const lowStock = products.filter((p) => p.stock < 10).length;
  const categoriesCount = new Set(products.map((p) => p.category)).size;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 🔹 Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
        {/* Left */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">📊 Product Dashboard</h1>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-2 w-64 hidden sm:block"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          {/* Cart Badge */}
          <div className="relative">
            <span className="material-icons">shopping_cart</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {count}
              </span>
            )}
          </div>
          {/* Avatar */}
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>

      {/* 🔹 Stats Section */}
      <main className="p-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Products */}
          <div className="bg-white p-6 rounded-2xl shadow flex flex-col">
            <h2 className="text-gray-500 text-sm">Total Products</h2>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-2xl shadow flex flex-col">
            <h2 className="text-gray-500 text-sm">Total Revenue</h2>
            <p className="text-2xl font-bold">₹{totalRevenue.toFixed(0)}</p>
          </div>

          {/* Low Stock Items */}
          <div className="bg-white p-6 rounded-2xl shadow flex flex-col">
            <h2 className="text-gray-500 text-sm">Low Stock Items</h2>
            <p className="text-2xl font-bold">{lowStock}</p>
          </div>

          {/* Categories Count */}
          <div className="bg-white p-6 rounded-2xl shadow flex flex-col">
            <h2 className="text-gray-500 text-sm">Categories</h2>
            <p className="text-2xl font-bold">{categoriesCount}</p>
          </div>
        </div>

        {/* Placeholder for other sections (Table / Grid etc.) */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-2">Welcome back 👋</h2>
          <p className="text-gray-600">
            Use the navigation to view Products, Cart, and Analytics.
          </p>
        </div>
      </main>
    </div>
  );
}
