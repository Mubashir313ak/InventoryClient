import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const QueueingCalculator = () => {
  const [arrivalRate, setArrivalRate] = useState("");
  const [serviceRate, setServiceRate] = useState("");
  const [numServers, setNumServers] = useState(1);
  const [queueModel, setQueueModel] = useState("MM1");
  const [iterations, setIterations] = useState([]);

  const simulateQueueing = () => {
    if (arrivalRate && serviceRate) {
      const λ = parseFloat(arrivalRate); // Arrival rate
      const μ = parseFloat(serviceRate); // Service rate
      const c = parseInt(numServers); // Number of servers

      const results = [];
      const maxIterations = 20;

      // Iterate over 'maxIterations' steps
      for (let i = 1; i <= maxIterations; i++) {
        let utilization,
          avgWaitTime,
          avgSystemTime,
          avgQueueLength,
          avgSystemLength;

        // MM1 Model
        if (queueModel === "MM1") {
          utilization = λ / μ;
          avgWaitTime = 1 / (μ - λ); // Average waiting time in queue
          avgSystemTime = 1 / (μ - λ) + 1 / μ; // Average time in system
          avgQueueLength = λ ** 2 / (μ * (μ - λ)); // Average queue length
          avgSystemLength = λ * avgSystemTime; // Average number in system
        }

        // MMC Model
        if (queueModel === "MMC") {
          utilization = λ / (c * μ);
          avgWaitTime =
            (Math.pow(λ, c) / (factorial(c) * Math.pow(c * μ, c - 1))) *
            (1 / (1 - utilization)); // Approximate
          avgSystemTime = avgWaitTime + 1 / μ;
          avgQueueLength = avgWaitTime * λ;
          avgSystemLength = avgQueueLength + λ / μ;
        }

        // MGC Model
        if (queueModel === "MGC") {
          // Placeholder: Use a basic approximation here, as M/G/c is more complex
          utilization = λ / (c * μ);
          avgWaitTime = λ / (c * (μ - λ));
          avgSystemTime = avgWaitTime + 1 / μ;
          avgQueueLength = λ * avgWaitTime;
          avgSystemLength = avgQueueLength + λ / μ;
        }

        results.push({
          iteration: i,
          utilization,
          avgWaitTime,
          avgSystemTime,
          avgQueueLength,
          avgSystemLength,
        });
      }

      setIterations(results);
    }
  };

  const chartData = {
    labels: iterations.map((item) => `Iteration ${item.iteration}`),
    datasets: [
      {
        label: "Average System Length",
        data: iterations.map((item) => item.avgSystemLength.toFixed(2)),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Average Queue Length",
        data: iterations.map((item) => item.avgQueueLength.toFixed(2)),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const factorial = (n) => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Queueing Model Calculator
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-300">
            Arrival Rate (λ)
          </label>
          <input
            type="number"
            value={arrivalRate}
            onChange={(e) => setArrivalRate(e.target.value)}
            className="w-full p-3 mt-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            placeholder="Enter arrival rate"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-300">
            Service Rate (μ)
          </label>
          <input
            type="number"
            value={serviceRate}
            onChange={(e) => setServiceRate(e.target.value)}
            className="w-full p-3 mt-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            placeholder="Enter service rate"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-300">
            Number of Servers (c)
          </label>
          <input
            type="number"
            value={numServers}
            onChange={(e) => setNumServers(e.target.value)}
            className="w-full p-3 mt-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            min="1"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-lg font-medium text-gray-300">
            Queueing Model
          </label>
          <select
            value={queueModel}
            onChange={(e) => setQueueModel(e.target.value)}
            className="w-full p-3 mt-2 bg-gray-800 border border-gray-600 rounded-md text-white"
          >
            <option value="MM1">M/M/1</option>
            <option value="MMC">M/M/c</option>
            <option value="MGC">M/G/c</option>
          </select>
        </div>

        <div className="col-span-2">
          <button
            onClick={simulateQueueing}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Simulate and Calculate
          </button>
        </div>
      </div>

      {/* Display Table with Iteration Results */}
      {iterations.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">
            Results for each iteration:
          </h3>

          <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
            <table className="min-w-full table-auto text-left text-gray-300">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2">Iteration</th>
                  <th className="px-4 py-2">Utilization (ρ)</th>
                  <th className="px-4 py-2">Avg Wait Time (Wq)</th>
                  <th className="px-4 py-2">Avg Time in System (Ws)</th>
                  <th className="px-4 py-2">Avg Queue Length (Lq)</th>
                  <th className="px-4 py-2">Avg System Length (Ls)</th>
                </tr>
              </thead>
              <tbody>
                {iterations.map((iteration, index) => (
                  <tr key={index} className="border-b hover:bg-gray-700">
                    <td className="px-4 py-2">{iteration.iteration}</td>
                    <td className="px-4 py-2">
                      {iteration.utilization.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      {iteration.avgWaitTime.toFixed(2)} units
                    </td>
                    <td className="px-4 py-2">
                      {iteration.avgSystemTime.toFixed(2)} units
                    </td>
                    <td className="px-4 py-2">
                      {iteration.avgQueueLength.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      {iteration.avgSystemLength.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Graph showing Average System Length and Average Queue Length */}
          <div className="mt-10">
            <Line data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QueueingCalculator;
