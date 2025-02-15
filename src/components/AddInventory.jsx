import { useState } from "react";
import axios from "axios";

const AddInventory = () => {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: 0,
    reorderLevel: 0,
    orderQuantity: 0,
    leadTime: 0,
    demandRate: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/inventory/add", formData)
      .then(() => alert("Item added"))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl font-bold">Add Inventory</h2>
      <input
        className="border p-2 m-2"
        name="productName"
        placeholder="Product Name"
        onChange={handleChange}
      />
      <input
        className="border p-2 m-2"
        name="quantity"
        type="number"
        placeholder="Quantity"
        onChange={handleChange}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 m-2 rounded">
        Add Item
      </button>
    </form>
  );
};

export default AddInventory;
