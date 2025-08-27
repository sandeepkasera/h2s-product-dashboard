export default function ViewProduct({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="max-w-lg w-full">
      <h2 className="text-lg font-semibold mb-4">{product.name}</h2>
      <img src={product.image} alt={product.name} className="w-40 h-40 rounded mb-4" />
      <p><b>Category:</b> {product.category}</p>
      <p><b>Price:</b> ₹{product.price}</p>
      <p><b>Stock:</b> {product.stock}</p>
      <p>
        <b>Status:</b>{" "}
        <span
          className={`px-2 py-1 rounded text-sm ${
            product.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {product.status}
        </span>
      </p>

      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded border bg-white text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
