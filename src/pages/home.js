import { useOutletContext } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import { useCart } from "../utils/cartContext";
import { useProducts } from "../utils/productContext";
import ProductTable from "../components/productTable";
import Modal from "../components/modals/Modal";

// Lazy load modals
const ViewProduct = lazy(() => import("../components/modals/viewProducts"));
const EditProduct = lazy(() => import("../components/modals/editProduct"));
const DeleteConfirm = lazy(() => import("../components/modals/deleteProduct"));

export default function Home() {
  const outletContext = useOutletContext() || {};
  const { search = "" } = outletContext;

  const { products, deleteProduct, updateProduct } = useProducts();
  const { state, api } = useCart();

  // Modal state
  const [viewingProduct, setViewingProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-4 mt-2">Our Products</h1>
        <ProductTable
          products={products}
          search={search}
          cartState={state}
          cartApi={api}
          onView={setViewingProduct}
          onEdit={setEditingProduct}
          onDelete={setDeletingProduct}
          onUpdateProduct={updateProduct}
          onDeleteProduct={deleteProduct}
        />
      </main>

      {/* View Modal */}
      {viewingProduct && (
        <Modal isOpen onClose={() => setViewingProduct(null)}>
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <ViewProduct
              product={viewingProduct}
              onClose={() => setViewingProduct(null)}
            />
          </Suspense>
        </Modal>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <Modal isOpen onClose={() => setEditingProduct(null)}>
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <EditProduct
              product={editingProduct}
              onClose={() => setEditingProduct(null)}
              onSave={(form) => {
                updateProduct(form.id, form);
                setEditingProduct(null);
              }}
            />
          </Suspense>
        </Modal>
      )}

      {/* Delete Modal */}
      {deletingProduct && (
        <Modal isOpen onClose={() => setDeletingProduct(null)}>
          <Suspense fallback={<div className="p-6">Loading...</div>}>
            <DeleteConfirm
              product={deletingProduct}
              onCancel={() => setDeletingProduct(null)}
              onDeleteProduct={(id) => {
                deleteProduct(id);
                setDeletingProduct(null);
              }}
              onDeleteStock={(id) => {
                updateProduct(id, { stock: deletingProduct.stock - 1 });
                setDeletingProduct(null);
              }}
            />
          </Suspense>
        </Modal>
      )}
    </div>
  );
}
