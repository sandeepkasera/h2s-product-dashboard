import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../utils/cartContext";
import { generateMockProducts } from "../utils/mockData";
import Pagination from "../utils/pagination";
import SidebarFilters from "../components/sideBar";
import ProductImage from "../components/blurSkeleton";
import {useDebounce} from "../utils/useDebounce";


export default function Home() {
  const outletContext = useOutletContext() || {};
  const { search = "" } = outletContext;

  const { state, api } = useCart();

  const [products] = useState(generateMockProducts(1000));
  const [filtered, setFiltered] = useState(products);

  // ✅ Debounce search value  
  const debouncedSearch = useDebounce(search, 400);

  // Filters
  const [filters, setFilters] = useState({
    sort: "",
    categories: new Set(),
    status: new Set(),
  });

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  useEffect(() => {
    let data = [...products];

    // ✅ Use debounced search
    if (debouncedSearch) {        
      data = data.filter((p) =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (filters.categories.size > 0) {
      data = data.filter((p) => filters.categories.has(p.category));
    }

    if (filters.status.size > 0) {
      data = data.filter((p) => filters.status.has(p.status));
    }

    switch (filters.sort) {
      case "price-asc":
        data.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        data.sort((a, b) => b.price - a.price);
        break;
      case "stock-asc":
        data.sort((a, b) => a.stock - b.stock);
        break;
      case "stock-desc":
        data.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    setFiltered(data);
    setPage(1);
  }, [debouncedSearch, filters, products]);  // ✅ depends on debouncedSearch


  // ✅ Paginate
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const currentPageItems = filtered.slice(start, end);
  const totalPages = Math.ceil(filtered.length / pageSize);

  // Get cart qty
  const getQty = (id) => state.items.get(id)?.qty || 0;

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar (desktop only) */}
      <div className="hidden md:block">
        <SidebarFilters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* 🔹 Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <SidebarFilters
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />
        </div>

        <h1 className="text-2xl font-bold mb-2 mt-2">Our Products</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentPageItems.map((p) => {
            const qty = getQty(p.id);
            return (
              <div
                key={p.id}
                className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition flex flex-col"
              >
                {/* <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                /> */}
                <ProductImage src={p.image} alt={p.name} />
                <h2 className="font-semibold text-lg">{p.name}</h2>
                <p className="text-sm text-gray-500">{p.category}</p>
                <p className="mt-2 font-bold">₹{p.price}</p>
                <div className="flex justify-between items-center mt-2 text-sm mb-3">
                  <span
                    className={`px-2 py-1 rounded ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.status}
                  </span>
                  <span className="text-gray-600">Stock: {p.stock}</span>
                </div>

                {/* Quantity Controls */}
                <div className="mt-auto flex items-center justify-between gap-2">
                  <button
                    onClick={() => api.dec(p.id)}
                    disabled={qty <= 0}
                    className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
                  >
                    -
                  </button>
                  <span>{qty}</span>
                  <button
                    onClick={() => {
                      if (qty === 0) api.add(p);
                      else if (qty < p.stock) api.inc(p.id);
                    }}
                    disabled={qty >= p.stock}
                    className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </main>
    </div>
  );
}