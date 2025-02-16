import { useState } from "react";
import axios from "axios";

const QueueSimulator = () => {
  const [params, setParams] = useState({
    lambda: "",
    mu: "",
    c: "1",
    sigma: "",
  });
  const [result, setResult] = useState(null);
  const [model, setModel] = useState("mm1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const simulateQueue = async () => {
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams(params).toString();
      const { data } = await axios.get(
        `https://inventoryserver-production-02bd.up.railway.app/api/queue/${model}?${query}`
      );
      setResult(data);
    } catch (err) {
      setError("Failed to fetch simulation data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-400">
        Queueing System Simulator
      </h2>

      {/* Arrival Rate */}
      <div className="mb-4">
        <label className="block text-gray-400">Arrival Rate (λ):</label>
        <input
          type="number"
          name="lambda"
          value={params.lambda}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          min="0"
        />
      </div>

      {/* Service Rate */}
      <div className="mb-4">
        <label className="block text-gray-400">Service Rate (μ):</label>
        <input
          type="number"
          name="mu"
          value={params.mu}
          onChange={handleChange}
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
          min="0"
        />
      </div>

      {/* Number of Servers (for M/M/c and M/G/c) */}
      {(model === "mmc" || model === "mgc") && (
        <div className="mb-4">
          <label className="block text-gray-400">Number of Servers (c):</label>
          <input
            type="number"
            name="c"
            value={params.c}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
            min="1"
          />
        </div>
      )}

      {/* Service Time Variance (for M/G/c) */}
      {model === "mgc" && (
        <div className="mb-4">
          <label className="block text-gray-400">
            Service Time Variance (σ):
          </label>
          <input
            type="number"
            name="sigma"
            value={params.sigma}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
            min="0"
          />
        </div>
      )}

      {/* Model Selection */}
      <div className="mb-4">
        <label className="block text-gray-400">Select Model:</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
        >
          <option value="mm1">M/M/1</option>
          <option value="mmc">M/M/c</option>
          <option value="mgc">M/G/c</option>
        </select>
      </div>

      {/* Simulate Button */}
      <button
        onClick={simulateQueue}
        className={`w-full px-4 py-2 rounded transition ${
          loading
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
        disabled={loading}
      >
        {loading ? "Simulating..." : "Simulate"}
      </button>

      {/* Error Message */}
      {error && <p className="mt-4 text-center text-red-400">{error}</p>}

      {/* Simulation Results */}
      {result && (
        <div className="mt-4 p-4 border border-gray-600 rounded bg-gray-800 text-white">
          <h3 className="text-lg font-bold text-green-400">Results:</h3>
          <pre className="text-gray-300">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QueueSimulator;
