import { useEffect, useState } from "react";
import axios from "axios";

const DeleteInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Number of items per page

  useEffect(() => {
    fetchInventory();
  }, [currentPage]);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(
        `https://inventoryserver-production-02bd.up.railway.app/api/inventory?page=${currentPage}&limit=${limit}`
      );
      console.log("API Response:", res.data);
      setInventory(res.data.items || []); // Ensure items exist
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching inventory", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://inventoryserver-production-02bd.up.railway.app/api/inventory/delete/${id}`
      );
      setInventory(inventory.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Delete Inventory Items</h2>
      {inventory.length === 0 ? (
        <p>No inventory items found.</p>
      ) : (
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
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-3 py-1">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DeleteInventory;
