import { useCart } from "../utils/cartContext";

export default function CartSidebar({ isOpen, onClose }) {
  const { state, api, total, count } = useCart();
  const items = [...state.items.values()]; // Map → array

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-xl">
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center mt-10">
              <h2 className="text-xl font-semibold">Your Cart is Empty 🛒</h2>
            </div>
          ) : (
            <table className="min-w-full border rounded-lg text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Subtotal</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map(({ product, qty }) => (
                  <tr key={product.id} className="border-t">
                    <td className="p-2 flex items-center gap-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <span>{product.name}</span>
                    </td>
                    <td className="p-2 flex items-center gap-1 justify-center">
                      <button
                        onClick={() => api.dec(product.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{qty}</span>
                      <button
                        onClick={() => api.inc(product.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </td>
                    <td className="p-2">₹{(product.price * qty).toFixed(2)}</td>
                    <td className="p-2">
                      <button
                        onClick={() => api.remove(product.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm font-medium mb-2">
            Total Items: {count} | Total: ₹{total.toFixed(2)}
          </p>
          <div className="flex gap-2">
            <button
              onClick={api.clear}
              className="flex-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear
            </button>
            <button
              onClick={() => alert("Proceeding to checkout...")}
              className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
