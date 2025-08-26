import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../utils/cartContext";
import { generateMockProducts } from "../utils/mockData";
 
export default function Dashboard() {
    const outletContext = useOutletContext() || {};
    const { search = "" } = outletContext;
 
    const { state, api } = useCart();
 
    const [products] = useState(generateMockProducts(1000));
    const [filtered, setFiltered] = useState(products);
 
    useEffect(() => {
        if (!search) {
            setFiltered(products);
        } else {
            setFiltered(
                products.filter((p) =>
                    p.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, products]);
 
    // Get quantity for a product from cart
    const getQty = (id) => state.items.get(id)?.qty || 0;
 
    return (
        <div>
            <h1 className="text-2xl font-bold">📊 Dashboard</h1>
            {/* Grid of Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((p) => {
                    const qty = getQty(p.id);
 
                    return (
                        <div
                            key={p.id}
                            className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition flex flex-col"
                        >
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <h2 className="font-semibold text-lg">{p.name}</h2>
                            <p className="text-sm text-gray-500">{p.category}</p>
                            <p className="mt-2 font-bold">&#8377;{p.price}</p>
                            <div className="flex justify-between items-center mt-2 text-sm mb-3">
                                <span
                                    className={`px-2 py-1 rounded ${p.status === "Active"
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
                                        if (qty === 0) api.add(p);      // first add
                                        else if (qty < p.stock) api.inc(p.id); // further increments
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
        </div>
    );
}