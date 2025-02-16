import { useEffect } from "react";
import img1 from "../../public/assets/img1.webp";
import img2 from "../../public/assets/img2.webp";
import img3 from "../../public/assets/img3.jpg";
import img4 from "../../public/assets/img4.webp";
import img5 from "../../public/assets/img5.png";

function HomePage({ onEnter }) {
  useEffect(() => {
    document.title = "Inventory Management Simulator";
  }, []);

  return (
    <div className="bg-black text-gray-300 min-h-screen">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-16 bg-gray-900 text-white">
        <h1 className="text-5xl font-bold">Inventory Management Simulator</h1>
        <p className="text-lg mt-4 max-w-3xl">
          Optimize your inventory with advanced simulation models like EOQ,
          Reorder Point, and Queuing Theory.
        </p>
        <button
          className="mt-6 px-8 py-3 bg-gray-700 text-white font-semibold rounded shadow-md hover:bg-gray-600"
          onClick={onEnter}
        >
          Enter the App
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800 p-6 shadow rounded-lg">
            <img
              src={img1}
              alt="Inventory Simulation"
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold">Inventory Simulation</h3>
            <p className="text-gray-400 mt-2">
              Implement models like Economic Order Quantity (EOQ), Reorder Point
              Model, and more.
            </p>
          </div>
          <div className="bg-gray-800 p-6 shadow rounded-lg">
            <img
              src={img2}
              alt="Queuing Models"
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold">Queuing Models</h3>
            <p className="text-gray-400 mt-2">
              Simulate M/M/1, M/M/c, and M/G/c queues for analyzing stock
              replenishment and service processes.
            </p>
          </div>
          <div className="bg-gray-800 p-6 shadow rounded-lg">
            <img
              src={img3}
              alt="Real-Time Visualization"
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold">Real-Time Visualization</h3>
            <p className="text-gray-400 mt-2">
              Track stock levels dynamically with real-time data updates and
              Recharts-based graphs.
            </p>
          </div>
        </div>
      </section>

      {/* Inventory Simulation Explanation */}
      <section className="bg-gray-900 py-16 px-8">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Understanding Inventory Simulation
        </h2>
        <img
          src={img4}
          alt="Inventory Simulation"
          className="w-full max-w-4xl mx-auto rounded mb-6"
        />
        <p className="max-w-4xl mx-auto text-lg text-gray-400 text-center">
          Inventory simulation helps businesses optimize stock levels by
          predicting demand and restocking accordingly. The Economic Order
          Quantity (EOQ) model, Reorder Point model, and other strategies are
          essential for efficient inventory control.
        </p>
      </section>

      {/* Queuing Theory Section */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Introduction to Queuing Models
        </h2>
        <img
          src={img5}
          alt="Queuing Theory"
          className="w-full max-w-4xl mx-auto rounded mb-6"
        />
        <p className="max-w-4xl mx-auto text-lg text-gray-400 text-center">
          Queuing theory helps businesses analyze service efficiency. Models
          like M/M/1, M/M/c, and M/G/c are used to simulate customer flow, order
          processing, and inventory restocking delays.
        </p>
      </section>

      {/* Call to Action */}
      <footer className="flex flex-col items-center justify-center text-center py-12 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold">
          Get Started with Inventory Simulation
        </h2>
        <p className="text-lg mt-4">
          Enhance your decision-making with data-driven inventory management.
        </p>
        <button
          className="mt-6 px-8 py-3 bg-gray-700 text-white font-semibold rounded shadow-md hover:bg-gray-600"
          onClick={onEnter}
        >
          Enter the App
        </button>
      </footer>
    </div>
  );
}
export default HomePage;
