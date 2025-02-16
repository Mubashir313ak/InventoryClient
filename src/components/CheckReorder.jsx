import { useState, useEffect } from "react";
import axios from "axios";

const CheckReorder = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(
        "https://inventoryserver-production-02bd.up.railway.app/api/inventory"
      );
      setInventory(res.data.items || []);
    } catch (error) {
      console.error("Error fetching inventory", error);
    }
  };

  const handleCheckReorder = async (id) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `https://inventoryserver-production-02bd.up.railway.app/api/inventory/check-reorder/${id}`
      );
      fetchInventory(); // Refresh inventory after update
      setMessage(res.data.message);
    } catch (error) {
      console.error("Error checking reorder", error);
      setMessage("Error checking reorder.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Check & Auto-Reorder</h2>
      {message && <p className="mb-2 text-green-600">{message}</p>}

      <ul>
        {inventory.map((item) => (
          <li
            key={item._id}
            className="border p-2 my-2 flex justify-between rounded"
          >
            <span>
              {item.productName} - {item.quantity} in stock
            </span>
            <button
              onClick={() => handleCheckReorder(item._id)}
              disabled={loading}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {loading ? "Checking..." : "Check Reorder"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckReorder;
