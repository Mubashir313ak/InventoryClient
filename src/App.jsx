import { useState } from "react";
import AddInventory from "./components/AddInventory";
import FetchInventory from "./components/FetchInventory";
import InventoryList from "./components/InventoryList";
import UpdateInventory from "./components/UpdateInventory";
import DeleteInventory from "./components/DeleteInventory";
import CheckReorder from "./components/CheckReorder";

function App() {
  const [activePage, setActivePage] = useState("add");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Inventory Management Simulator
      </h1>
      {/* Navigation Buttons */}
      <div className="mb-4 flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            activePage === "add" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActivePage("add")}
        >
          Add Inventory
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activePage === "list" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActivePage("list")}
        >
          Inventory List
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activePage === "fetch" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActivePage("fetch")}
        >
          Fetch Inventory
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activePage === "update" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActivePage("update")}
        >
          Update Inventory
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activePage === "delete" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActivePage("delete")}
        >
          Delete Inventory
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activePage === "check" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActivePage("check")}
        >
          Check Reorder
        </button>
      </div>
      {/* Render Components Based on Active Page */}
      <div className="border p-4 rounded shadow-md">
        {activePage === "add" && <AddInventory />}
        {activePage === "list" && <InventoryList />}
        {activePage === "fetch" && <FetchInventory />}
        {activePage === "update" && <UpdateInventory />}
        {activePage === "delete" && <DeleteInventory />}
        {activePage === "check" && <CheckReorder />}
      </div>
    </div>
  );
}

export default App;
