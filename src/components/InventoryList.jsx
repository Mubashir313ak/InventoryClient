import { useEffect, useState } from "react";
import axios from "axios";

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchInventory();
  }, [currentPage]);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://inventoryserver-production-02bd.up.railway.app/api/inventory?page=${currentPage}&limit=${itemsPerPage}`
      );

      if (res.data && Array.isArray(res.data.items)) {
        setItems(res.data.items);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      console.error("Error fetching inventory:", err);
      setError("Failed to fetch inventory data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-400">
        Inventory List
      </h2>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-blue-400">Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-2 px-4 border">Product</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Reorder Level</th>
              <th className="py-2 px-4 border">Order Quantity</th>
              <th className="py-2 px-4 border">Lead Time (Days)</th>
              <th className="py-2 px-4 border">Demand Rate</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr
                  key={item._id}
                  className={`text-center border hover:bg-gray-700 transition ${
                    item.quantity <= item.reorderLevel ? "bg-red-700" : ""
                  }`}
                >
                  <td className="py-2 px-4 border">{item.productName}</td>
                  <td className="py-2 px-4 border">{item.quantity}</td>
                  <td className="py-2 px-4 border">{item.reorderLevel}</td>
                  <td className="py-2 px-4 border">{item.orderQuantity}</td>
                  <td className="py-2 px-4 border">{item.leadTime}</td>
                  <td className="py-2 px-4 border">{item.demandRate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No inventory data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span className="px-4 py-2 border rounded bg-gray-700 text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryList;
