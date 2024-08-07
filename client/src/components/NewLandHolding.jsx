// src/components/NewLandHolding.jsx

import { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import api from "../services/api";

const titleSourceOptions = ["Class A", "Class B", "Class C", "Class D"];

export default function NewLandHolding({ onSave }) {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [owners, setOwners] = useState([]);
  const [legalEntity, setLegalEntity] = useState("");
  const [netMineralAcres, setNetMineralAcres] = useState("");
  const [mineralOwnerRoyalty, setMineralOwnerRoyalty] = useState("");
  const [section, setSection] = useState("");
  const [township, setTownship] = useState("");
  const [range, setRange] = useState("");
  const [titleSource, setTitleSource] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await api.get("/owners");
        setOwners(response.data);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };
    fetchOwners();
  }, []);

  const handleSectionChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setSection(value);
    }
  };

  const handleTownshipChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^\d{0,3}[NS]?$/.test(value)) {
      setTownship(value);
    }
  };

  const handleRangeChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^\d{0,3}[EW]?$/.test(value)) {
      setRange(value);
    }
  };

  const handleSave = async () => {
    if (!legalEntity) {
      alert("Legal Entity is required");
      return;
    }

    const townshipPattern = /^[0-9]{3}[NS]$/;
    const rangePattern = /^[0-9]{3}[EW]$/;

    if (!townshipPattern.test(township)) {
      alert("Invalid township format. Expected format: 123N or 123S");
      return;
    }

    if (!rangePattern.test(range)) {
      alert("Invalid range format. Expected format: 123E or 123W");
      return;
    }

    if (netMineralAcres < 0) {
      alert("Net Mineral Acres cannot be negative");
      return;
    }

    if (mineralOwnerRoyalty < 0) {
      alert("Mineral Owner Royalty cannot be negative");
      return;
    }

    const sectionName = `${section}-${township}-${range}`;
    const name = `${sectionName} ${legalEntity}`;

    try {
      const newLandHolding = {
        name,
        owner: owner || null,
        legalEntity,
        netMineralAcres,
        mineralOwnerRoyalty,
        sectionName,
        section,
        township,
        range,
        titleSource,
      };

      const response = await api.post("/landholdings", newLandHolding);
      const createdLandHolding = response.data;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await api.post(
          `/landholdings/${createdLandHolding._id}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const updatedLandHoldingResponse = await api.get(
          `/landholdings/${createdLandHolding._id}`
        );
        onSave(updatedLandHoldingResponse.data);
      } else {
        onSave(createdLandHolding);
      }

      setName("");
      setOwner("");
      setLegalEntity("");
      setNetMineralAcres("");
      setMineralOwnerRoyalty("");
      setSection("");
      setTownship("");
      setRange("");
      setTitleSource("");
      setFile(null);
    } catch (error) {
      console.error("Error saving land holding:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">New Land Holding</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Legal Entity"
          value={legalEntity}
          onChange={(e) => setLegalEntity(e.target.value)}
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Owner
          </label>
          <select
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Owner (Leave Blank if None)</option>
            {owners.map((owner) => (
              <option key={owner._id} value={owner._id}>
                {owner.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Net Mineral Acres"
          type="number"
          value={netMineralAcres}
          onChange={(e) => setNetMineralAcres(e.target.value)}
        />
        <Input
          label="Mineral Owner Royalty (%)"
          type="number"
          value={mineralOwnerRoyalty}
          onChange={(e) => setMineralOwnerRoyalty(e.target.value)}
        />
        <Input
          label="Section"
          value={section}
          placeholder="(e.g., 123)"
          onChange={handleSectionChange}
        />
        <Input
          label="Township"
          value={township}
          placeholder="(e.g., 123N or 123S)"
          onChange={handleTownshipChange}
        />
        <Input
          label="Range"
          value={range}
          placeholder="(e.g., 123E or 123W)"
          onChange={handleRangeChange}
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title Source
          </label>
          <select
            value={titleSource}
            onChange={(e) => setTitleSource(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Select Title Source
            </option>
            {titleSourceOptions.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload File
          </label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
      </div>
      <Button
        text="Save"
        onClick={handleSave}
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
      />
    </div>
  );
}
