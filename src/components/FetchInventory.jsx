import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const socket = io("http://localhost:3000");

const FetchInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchInventory(page);

    socket.on("inventoryUpdate", (data) => {
      console.log(data.message);
      fetchInventory(page);
    });

    return () => socket.off("inventoryUpdate");
  }, [page]); // Re-fetch on page change

  const fetchInventory = async (pageNumber) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/inventory?page=${pageNumber}&limit=10`
      );
      setInventory(res.data.items);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Inventory Stock Levels</h2>

      {/* Line Chart */}
      <LineChart width={800} height={400} data={inventory}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="productName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
        <Line type="monotone" dataKey="reorderLevel" stroke="#82ca9d" />
      </LineChart>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          {page} / {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FetchInventory;
