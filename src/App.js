import './App.css';
import { CartProvider } from './utils/cartContext';
import { ProductProvider } from "./utils/productContext";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./layout";

// ✅ Match exact filenames
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Cart from "./pages/cart";

function WrapperView() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap child routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  // ⚠️ remove unused state for now
  // const [products] = useState(generateMockProducts(1000));

  return (
    <div className="App">
      <ProductProvider>
        <CartProvider>
          <WrapperView />
        </CartProvider>
      </ProductProvider>
    </div>
  );
}

export default App;

