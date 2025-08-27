import ProductImage from "./blurSkeleton";

export default function ProductRow({
  product,
  columns,
  cartState,
  cartApi,
  onView,
  onEdit,
  onDelete,
}) {
  const qty = cartState.items.get(product.id)?.qty || 0;

  return (
    <tr className="border-t hover:bg-gray-50">
      {columns.map((col) => {
        switch (col.key) {
          case "image":
            return (
              <td key="image" className="px-4 py-2">
                <div className="w-16 h-16">
                  <ProductImage src={product.image} alt={product.name} />
                </div>
              </td>
            );
          case "name":
            return <td key="name" className="px-4 py-2">{product.name}</td>;
          case "category":
            return <td key="category" className="px-4 py-2">{product.category}</td>;
          case "price":
            return <td key="price" className="px-4 py-2 font-bold">₹{product.price}</td>;
          case "status":
            return (
              <td key="status" className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    product.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.status}
                </span>
              </td>
            );
          case "stock":
            return <td key="stock" className="px-4 py-2">{product.stock}</td>;
          case "cart":
            return (
              <td key="cart" className="px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => cartApi.dec(product.id)}
                    disabled={qty <= 0}
                    className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
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
                    className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </td>
            );
          case "actions":
            return (
              <td key="actions" className="px-4 py-2 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onView(product)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            );
          default:
            return null;
        }
      })}
    </tr>
  );
}
