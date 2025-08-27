import { useState } from "react";
// import { Filter } from "lucide-react"; // optional icon

export default function SidebarFilters({ filters, setFilters, categories }) {
  const [open, setOpen] = useState(false);

  const toggleCategory = (cat) => {
    setFilters((prev) => {
      const newCats = new Set(prev.categories);
      if (newCats.has(cat)) newCats.delete(cat);
      else newCats.add(cat);
      return { ...prev, categories: newCats };
    });
  };

  const toggleStatus = (status) => {
    setFilters((prev) => {
      const newStatus = new Set(prev.status);
      if (newStatus.has(status)) newStatus.delete(status);
      else newStatus.add(status);
      return { ...prev, status: newStatus };
    });
  };

  return (
    <>
      {/* 🔹 Mobile Toggle Button (ONLY visible on small screens) */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          {/* <Filter size={18} /> Filters */}
          FI
        </button>
      </div>

      {/* 🔹 Mobile Filter Panel (collapsible, above products) */}
      {open && (
        <div className="md:hidden bg-white shadow-lg p-4 rounded mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Filters</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-red-500 font-bold"
            >
              ✕
            </button>
          </div>

          {/* Sort */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Sort By</h3>
            <select
              value={filters.sort}
              onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="">None</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="stock-asc">Stock: Low → High</option>
              <option value="stock-desc">Stock: High → Low</option>
            </select>
          </div>

          {/* Categories */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Categories</h3>
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={filters.categories.has(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Status */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Status</h3>
            {["Active", "Inactive"].map((status) => (
              <label key={status} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={filters.status.has(status)}
                  onChange={() => toggleStatus(status)}
                />
                {status}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 🔹 Desktop Sidebar (always visible at left) */}
      <aside className="hidden md:block bg-white shadow-lg p-4 w-64 mr-6 rounded">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        {/* Sort */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Sort By</h3>
          <select
            value={filters.sort}
            onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">None</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="stock-asc">Stock: Low → High</option>
            <option value="stock-desc">Stock: High → Low</option>
          </select>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Categories</h3>
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={filters.categories.has(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Status */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Status</h3>
          {["Active", "Inactive"].map((status) => (
            <label key={status} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={filters.status.has(status)}
                onChange={() => toggleStatus(status)}
              />
              {status}
            </label>
          ))}
        </div>
      </aside>
    </>
  );
}
