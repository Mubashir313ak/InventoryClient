import { useState, useEffect } from "react";
import axios from "axios";

const UpdateInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/inventory");
      setInventory(res.data.items); // Ensure you're accessing the correct array
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  const handleUpdate = async () => {
    if (!selectedItem || !newQuantity) {
      setMessage("Please select an item and enter a new quantity.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/inventory/update/${selectedItem}`,
        {
          quantity: newQuantity,
        }
      );

      setMessage(res.data.message);
      fetchInventory(); // Refresh inventory list
    } catch (err) {
      console.error("Error updating item:", err);
      setMessage("Failed to update inventory.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
        Update Inventory Stock
      </h2>

      {/* Select Inventory Item */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Select Product:</label>
        <select
          className="w-full p-2 border rounded"
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
        <label className="block text-gray-700 font-bold">New Quantity:</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          min="0"
        />
      </div>

      {/* Update Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleUpdate}
      >
        Update Stock
      </button>

      {/* Message Display */}
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default UpdateInventory;
