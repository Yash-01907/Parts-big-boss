"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types/product";

interface Make {
  id: number;
  name: string;
}

interface Model {
  id: number;
  name: string;
}
interface Year {
  year: number;
}
interface VehicleSelectorProps {
  onSearchResults: (results: Product[]) => void;
}

export default function VehicleSelector({
  onSearchResults,
}: VehicleSelectorProps) {
  const [makes, setMakes] = useState<Make[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [loading, setLoading] = useState(false);

  /* ------------------ Load Makes ------------------ */
  useEffect(() => {
    axios
      .get<Make[]>("http://localhost:5000/api/vehicles/companies")
      .then((res) => setMakes(res.data))
      .catch((err) => console.error(err));
  }, []);

  /* ------------------ Load Models ------------------ */
  useEffect(() => {
    if (!selectedMake) return;

    axios
      .get<Model[]>(`http://localhost:5000/api/vehicles/models/${selectedMake}`)
      .then((res) => setModels(res.data))
      .catch((err) => console.error(err));
  }, [selectedMake]);

  /* ------------------ Load Years ------------------ */
  useEffect(() => {
    if (!selectedModel) {
      setYears([]);
      setSelectedYear("");
      return;
    }

    axios
      .get<number[]>(`http://localhost:5000/api/vehicles/years/${selectedModel}`)
      .then((res) => setYears(res.data))
      .catch((err) => console.error("Failed to load years", err));
  }, [selectedModel]);

  /* ------------------ Search Handler ------------------ */
  const handleSearch = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (selectedMake) params.append("make_id", selectedMake);
      if (selectedModel) params.append("model_id", selectedModel);
      if (selectedYear) params.append("year", selectedYear);

      const response = await axios.get<{ results: Product[] }>(
        `http://localhost:5000/api/products/search?${params.toString()}`
      );

      onSearchResults(response.data.results);
    } catch (error) {
      console.error("Search failed", error);
      alert("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Make */}
        <select
          value={selectedMake}
          onChange={(e) => {
            setSelectedMake(e.target.value);
            setSelectedModel("");
          }}
          className="border rounded-md p-2"
        >
          <option value="">Select Make</option>
          {makes.map((make) => (
            <option key={make.id} value={make.id}>
              {make.name}
            </option>
          ))}
        </select>

        {/* Model */}
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          disabled={!selectedMake}
          className="border rounded-md p-2"
        >
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>

        {/* Year */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          disabled={!selectedModel || years.length === 0}
          className="border rounded-md p-2 disabled:bg-gray-100 disabled:text-gray-400"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Searching..." : "Find Parts"}
      </button>
    </div>
  );
}
