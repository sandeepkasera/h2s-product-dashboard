import { useState, useEffect } from "react";
import { useDebounce } from "../utils/useDebounce";
import Pagination from "../utils/pagination";
import ProductRow from "../components/productRow";
import ProductCard from "../components/productCard"; // 👈 new component for mobile

export default function ProductTable({
  products,
  search,
  cartState,
  cartApi,
  onView,
  onEdit,
  onDelete,
}) {
  const debouncedSearch = useDebounce(search, 400);
  const [filtered, setFiltered] = useState(products);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Column ordering
  const [columns, setColumns] = useState([
    { key: "image", label: "Image", sortable: false },
    { key: "name", label: "Name", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    { key: "cart", label: "Cart", sortable: false },
    { key: "actions", label: "Actions", sortable: false },
  ]);
  const [draggedColIndex, setDraggedColIndex] = useState(null);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDragStart = (index) => setDraggedColIndex(index);
  const handleDrop = (index) => {
    if (draggedColIndex === null) return;
    const reordered = [...columns];
    const [removed] = reordered.splice(draggedColIndex, 1);
    reordered.splice(index, 0, removed);
    setColumns(reordered);
    setDraggedColIndex(null);
  };

  // Filtering + sorting
  useEffect(() => {
    let data = [...products];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      data = data.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sortConfig.key) {
      const dir = sortConfig.direction === "asc" ? 1 : -1;
      data.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (sortConfig.key === "price" || sortConfig.key === "stock") {
          aVal = Number(aVal);
          bVal = Number(bVal);
        } else {
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
        }
        if (aVal < bVal) return -1 * dir;
        if (aVal > bVal) return 1 * dir;
        return 0;
      });
    }
    setFiltered(data);
    setPage(1);
  }, [products, debouncedSearch, sortConfig]);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const currentPageItems = filtered.slice(start, end);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div>
      {/* MOBILE CARDS */}
      <div className="grid gap-3 sm:hidden">
        {currentPageItems.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            cartState={cartState}
            cartApi={cartApi}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                  className={`px-4 py-2 text-left ${
                    col.sortable ? "cursor-pointer" : ""
                  }`}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  {col.label}
                  {sortConfig.key === col.key &&
                    (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((p) => (
              <ProductRow
                key={p.id}
                product={p}
                columns={columns}
                cartState={cartState}
                cartApi={cartApi}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
