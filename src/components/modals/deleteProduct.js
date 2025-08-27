export default function DeleteConfirm({ product, onCancel, onDeleteProduct, onDeleteStock }) {
  if (!product) return null;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Delete Product</h2>
      <p className="mb-6">
        Are you sure you want to delete <span className="font-bold">{product.name}</span>?
      </p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={() => onDeleteStock(product.id)}
          disabled={product.stock <= 0}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          Delete One Stock
        </button>
        <button
          onClick={() => onDeleteProduct(product.id)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
}
