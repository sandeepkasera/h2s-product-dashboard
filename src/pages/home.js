import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../utils/cartContext";
import { useProducts } from "../utils/productContext";

import Pagination from "../utils/pagination";
import ProductImage from "../components/blurSkeleton";
import { useDebounce } from "../utils/useDebounce";
import Modal from "../components/modals/Modal";
import ViewProduct from "../components/modals/viewProducts";
import EditProduct from "../components/modals/editProduct";
import DeleteConfirm from "../components/modals/deleteProduct";

export default function Home() {
    const outletContext = useOutletContext() || {};
    const { search = "" } = outletContext;

    const { products, deleteProduct, updateProduct } = useProducts();
    const { state, api } = useCart();

    const [filtered, setFiltered] = useState(products);

    const debouncedSearch = useDebounce(search, 400);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const [page, setPage] = useState(1);
    const pageSize = 10;

    // Modal state
    const [viewingProduct, setViewingProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);

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

    const getQty = (id) => state.items.get(id)?.qty || 0;

    return (
        <div className="flex flex-col">
            <main className="flex-1">
                <h1 className="text-2xl font-bold mb-4 mt-2">Our Products</h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left">Image</th>
                                <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("name")}>
                                    Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                </th>
                                <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("category")}>
                                    Category {sortConfig.key === "category" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                </th>
                                <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("price")}>
                                    Price {sortConfig.key === "price" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                </th>
                                <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("status")}>
                                    Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                </th>
                                <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("stock")}>
                                    Stock {sortConfig.key === "stock" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                                </th>
                                <th className="px-4 py-2 text-center">Cart</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageItems.map((p) => {
                                const qty = getQty(p.id);
                                return (
                                    <tr key={p.id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                            <div className="w-16 h-16">
                                                <ProductImage src={p.image} alt={p.name} />
                                            </div>
                                        </td>
                                        <td className="px-4 py-2">{p.name}</td>
                                        <td className="px-4 py-2">{p.category}</td>
                                        <td className="px-4 py-2 font-bold">₹{p.price}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded text-sm ${p.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">{p.stock}</td>
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => api.dec(p.id)} disabled={qty <= 0} className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50">-</button>
                                                <span>{qty}</span>
                                                <button onClick={() => { if (qty === 0) api.add(p); else if (qty < p.stock) api.inc(p.id); }} disabled={qty >= p.stock} className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50">+</button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => setViewingProduct(p)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm">View</button>
                                                <button onClick={() => setEditingProduct(p)} className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded text-sm">Edit</button>
                                                <button onClick={() => setDeletingProduct(p)} className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4">
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                </div>
            </main>

            {/* View Modal */}
            {viewingProduct && (
                <Modal isOpen={!!viewingProduct} onClose={() => setViewingProduct(null)}>
                    <ViewProduct product={viewingProduct} onClose={() => setViewingProduct(null)} />
                </Modal>
            )}

            {/* Edit Modal */}
            {editingProduct && (
                <Modal isOpen={!!editingProduct} onClose={() => setEditingProduct(null)}>
                    <EditProduct
                        product={editingProduct}
                        onClose={() => setEditingProduct(null)}
                        onSave={(form) => {
                            updateProduct(form.id, form);
                            setEditingProduct(null);
                        }}
                    />
                </Modal>
            )}

            {/* Delete Modal */}
            {deletingProduct && (
                <Modal isOpen={!!deletingProduct} onClose={() => setDeletingProduct(null)}>
                    <DeleteConfirm
                        product={deletingProduct}
                        onCancel={() => setDeletingProduct(null)}
                        onDeleteProduct={(id) => {
                            deleteProduct(id); // remove from context completely
                            setDeletingProduct(null);
                        }}
                        onDeleteStock={(id) => {
                            updateProduct(id, { stock: deletingProduct.stock - 1 }); // just decrement stock
                            setDeletingProduct(null);
                        }}
                    />
                </Modal>
            )}
        </div>
    );
}
