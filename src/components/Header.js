import React from "react";
import { useCart } from "../utils/cartContext";


export default function Header({ onSearch, onOpenCart }) {
    const { count } = useCart();
    return (
        <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">PD</div>
                    <span className="hidden text-sm font-medium text-gray-600 sm:block">Product Dashboard</span>
                </div>


                <input
                    type="search"
                    placeholder="Search products…"
                    className="w-full max-w-md rounded-xl border px-3 py-2 text-sm outline-none focus:ring sm:mx-6"
                    onChange={(e) => onSearch?.(e.target.value)}
                />


                <div className="flex items-center gap-4">
                    <button
                        onClick={onOpenCart}
                        className="relative rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
                        aria-label="Open cart"
                    >
                        🛒
                        {count > 0 && (
                            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold text-white">
                                {count}
                            </span>
                        )}
                    </button>


                    <div className="h-8 w-8 overflow-hidden rounded-full">
                        <img src="https://i.pravatar.cc/64" alt="avatar" className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>
        </header>
    );
}