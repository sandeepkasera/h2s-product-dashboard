import React from "react";
import { useProducts } from "../utils/productContext";

export default function DashboardLayout() {
  const { products } = useProducts(); // ✅ get products from context

  // 🔹 Stats
  const totalProducts = products.length;
  const totalRevenue = products.reduce(
    (sum, p) => sum + Number(p.price) * (p.stock / 2), // fake revenue calc
    0
  );
  const lowStock = products.filter((p) => p.stock < 10).length;
  const categoriesCount = new Set(products.map((p) => p.category)).size;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
