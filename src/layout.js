import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";  
 
function Layout() {
    const [search, setSearch] = useState("");
  return (
    <div className="app-container flex">
      {/* Sidebar can be added here if needed */}
 
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header onSearch={setSearch}  />
 
        {/* Dynamic Route Content */}
        <main className="p-6">
            <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}
 
export default Layout;