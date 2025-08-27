import ProductImage from "./blurSkeleton";

export default function ProductCard({ product, cartState, cartApi, onView, onEdit, onDelete }) {
  const qty = cartState.items.get(product.id)?.qty || 0;

  return (
    <div className="rounded-lg border p-3 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16">
          <ProductImage src={product.image} alt={product.name} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold truncate">{product.name}</h3>
          <p className="text-xs text-gray-500">
            {product.category} • ₹{product.price}
          </p>
          <p className="text-xs mt-1">
            Stock: {product.stock} •{" "}
            <span
              className={`px-2 py-0.5 rounded ${
                product.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.status}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => cartApi.dec(product.id)}
          disabled={qty <= 0}
          className="bg-gray-200 px-3 py-1 rounded text-sm disabled:opacity-50"
        >
          -
        </button>
        <span>{qty}</span>
        <button
          onClick={() => {
            if (qty === 0) cartApi.add(product);
            else if (qty < product.stock) cartApi.inc(product.id);
          }}
          disabled={qty >= product.stock}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
        >
          +
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onView(product)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm"
        >
          View
        </button>
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product)}
          className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
