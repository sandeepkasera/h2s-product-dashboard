import { useState } from "react";
import EditProductModal from "./modals/EditProductModal";
import ViewProductModal from "./modals/ViewProductModal";
import DeleteProductModal from "./modals/DeleteProductModal";

export default function ProductsTable({ products, onEdit, onDelete }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modal, setModal] = useState(null); // "view" | "edit" | "delete"

  return (
    <>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Category</th>
            <th className="border px-4 py-2 text-left">Price</th>
            <th className="border px-4 py-2 text-left">Stock</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.category}</td>
              <td className="border px-4 py-2">${p.price}</td>
              <td className="border px-4 py-2">{p.stock}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button onClick={() => { setSelectedProduct(p); setModal("view"); }}
                  className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
                  View
                </button>
                <button onClick={() => { setSelectedProduct(p); setModal("edit"); }}
                  className="px-2 py-1 bg-green-500 text-white rounded text-sm">
                  Edit
                </button>
                <button onClick={() => { setSelectedProduct(p); setModal("delete"); }}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      <EditProductModal
        isOpen={modal === "edit"}
        onClose={() => setModal(null)}
        product={selectedProduct}
        onSave={onEdit}
      />
      <ViewProductModal
        isOpen={modal === "view"}
        onClose={() => setModal(null)}
        product={selectedProduct}
      />
      <DeleteProductModal
        isOpen={modal === "delete"}
        onClose={() => setModal(null)}
        product={selectedProduct}
        onDelete={onDelete}
      />
    </>
  );
}
