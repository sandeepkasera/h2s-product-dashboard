import './App.css';
import { useState } from "react";
import { generateMockProducts } from "./utils/mockData";
import Header from "./components/Header";
import { CartProvider } from './utils/cartContext';

function App() {
  const [products] = useState(generateMockProducts(1000));

  return (
    <div className="App">
      <CartProvider>
      <header className="App-header">
       
        <Header />
      </header>
      <main>
        <h1 className="text-2xl font-bold">Product Dashboard</h1>
        <p>Total Products: {products.length}</p>
      </main>
       </CartProvider>
    </div>
  );
}

export default App;
