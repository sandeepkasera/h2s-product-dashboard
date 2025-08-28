import React, { useState } from "react";
import { useCart } from "../utils/cartContext";
import { useNavigate } from "react-router-dom";   // ✅ Import
import CartSidebar from "./cart";


export default function Header({ onSearch, onOpenCart }) {
    const { count } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const [isCartOpen, setIsCartOpen] = useState(false);



    return (
        <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Left: Logo */}
                <div onClick={() => navigate("/")} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
                        PMD
                    </div>
                    <span className="hidden text-sm font-medium text-gray-600 sm:block">
                        H2S Product
                    </span>
                </div>

                {/* Desktop Search */}
                <input
                    type="search"
                    placeholder="Search products…"
                    className="hidden sm:block w-full max-w-md rounded-xl border px-3 py-2 text-sm outline-none focus:ring sm:mx-6"
                    onChange={(e) => onSearch?.(e.target.value)}
                />

                {/* Right: Cart + Avatar + Mobile Menu */}
                <div className="flex items-center gap-4">
                    {/* Cart */}
                    <button
                        onClick={() => setIsCartOpen(true)}
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
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="relative rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
                        aria-label="Open admin dashboard"
                    >
                        Dashboard
                    </button>

                    {/* Avatar */}
                    <div className="h-8 w-8 overflow-hidden rounded-full">
                        <img
                            src="https://i.pravatar.cc/64"
                            alt="avatar"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? "✖️" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="sm:hidden border-t bg-white px-4 py-3">
                    {/* Mobile Search */}
                    <input
                        type="search"
                        placeholder="Search products…"
                        className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring"
                        onChange={(e) => onSearch?.(e.target.value)}
                    />
                </div>
            )}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
        
    );
}
