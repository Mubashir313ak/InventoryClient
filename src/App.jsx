import { useEffect, useState } from "react";
import AddInventory from "./components/AddInventory";
import FetchInventory from "./components/FetchInventory";
import InventoryList from "./components/InventoryList";
import UpdateInventory from "./components/UpdateInventory";
import DeleteInventory from "./components/DeleteInventory";
import CheckReorder from "./components/CheckReorder";
import QueueSimulator from "./components/QueueSimulator";
import HomePage from "./components/HomePage";
import QueueingCalculator from "./components/MM1";

function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="p-4 bg-black text-gray-300 min-h-screen">
      {activePage === "home" ? (
        <HomePage onEnter={() => setActivePage("app")} />
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-white">
            Inventory Management Simulator
          </h1>
          {/* Navigation Buttons */}
          <div className="mb-4 flex space-x-4">
            <button
              className={`px-4 py-2 rounded ${
                activePage === "add" ? "bg-blue-600 text-white" : "bg-gray-700"
              }`}
              onClick={() => setActivePage("add")}
            >
              Add Inventory
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activePage === "list" ? "bg-blue-600 text-white" : "bg-gray-700"
              }`}
              onClick={() => setActivePage("list")}
            >
              Inventory List
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activePage === "fetch"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700"
              }`}
              onClick={() => setActivePage("fetch")}
            >
              Fetch Inventory
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activePage === "update"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700"
              }`}
              onClick={() => setActivePage("update")}
            >
              Update Inventory
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activePage === "delete"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700"
              }`}
              onClick={() => setActivePage("delete")}
            >
              Delete Inventory
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activePage === "check"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700"
              }`}
              onClick={() => setActivePage("check")}
            >
              Check Reorder
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activePage === "queue"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700"
              }`}
              onClick={() => setActivePage("queue")}
            >
              Queue Simulation
            </button>
          </div>
          {/* Render Components Based on Active Page */}
          <div className="border p-4 rounded shadow-md bg-gray-900 text-gray-300">
            {activePage === "add" && <AddInventory />}
            {activePage === "list" && <InventoryList />}
            {activePage === "fetch" && <FetchInventory />}
            {activePage === "update" && <UpdateInventory />}
            {activePage === "delete" && <DeleteInventory />}
            {activePage === "check" && <CheckReorder />}
            {activePage === "queue" && <QueueingCalculator />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
