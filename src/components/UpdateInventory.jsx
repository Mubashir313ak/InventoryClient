import { useState, useEffect } from "react";
import axios from "axios";

const UpdateInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://inventoryserver-production-02bd.up.railway.app/api/inventory"
      );
      setInventory(res.data.items);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      setMessage("Failed to load inventory.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedItem || !newQuantity) {
      setMessage("Please select an item and enter a new quantity.");
      return;
    }

    try {
      const res = await axios.put(
        `https://inventoryserver-production-02bd.up.railway.app/api/inventory/update/${selectedItem}`,
        { quantity: newQuantity }
      );
      setMessage(res.data.message);
      fetchInventory();
    } catch (err) {
      console.error("Error updating item:", err);
      setMessage("Failed to update inventory.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-400">
        Update Inventory Stock
      </h2>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-blue-400">Loading...</p>}

      {/* Select Inventory Item */}
      <div className="mb-4">
        <label className="block text-gray-400 font-bold">Select Product:</label>
        <select
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option value="">-- Select an item --</option>
          {inventory.map((item) => (
            <option key={item._id} value={item._id}>
              {item.productName} (Current: {item.quantity})
            </option>
          ))}
        </select>
      </div>

      {/* Enter New Quantity */}
      <div className="mb-4">
        <label className="block text-gray-400 font-bold">New Quantity:</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          min="0"
        />
      </div>

      {/* Update Button */}
      <button
        className={`w-full px-4 py-2 rounded transition ${
          !selectedItem || !newQuantity
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-500"
        }`}
        onClick={handleUpdate}
        disabled={!selectedItem || !newQuantity}
      >
        Update Stock
      </button>

      {/* Message Display */}
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("Failed") ? "text-red-400" : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default UpdateInventory;
