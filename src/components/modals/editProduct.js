import { useState } from "react";

export default function EditProduct({ product, onClose, onSave }) {
  const [form, setForm] = useState({ ...product });

  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.name.trim()) return alert("Name required");
    if (isNaN(Number(form.price))) return alert("Price must be numeric");
    if (!Number.isInteger(Number(form.stock))) return alert("Stock must be integer");
    onSave(form);
  };

  return (
    <div className="max-w-xl w-full">
      <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 block w-full rounded border px-3 py-2 text-sm"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            className="mt-1 block w-full rounded border px-3 py-2 text-sm"
            value={form.category}
            onChange={(e) => onChange("category", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              className="mt-1 block w-full rounded border px-3 py-2 text-sm"
              value={form.price}
              onChange={(e) => onChange("price", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input
              className="mt-1 block w-full rounded border px-3 py-2 text-sm"
              value={form.stock}
              onChange={(e) => onChange("stock", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            className="mt-1 block w-full rounded border px-3 py-2 text-sm"
            value={form.status}
            onChange={(e) => onChange("status", e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            className="mt-1 block w-full rounded border px-3 py-2 text-sm"
            value={form.image}
            onChange={(e) => onChange("image", e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border bg-white text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
