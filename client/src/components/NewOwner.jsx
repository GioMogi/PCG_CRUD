import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import api from "../services/api";

const entityTypeOptions = ["Company", "Individual", "Investor", "Trust"];
const ownerTypeOptions = ["Competitor", "Seller", "Investor", "Professional"];

export default function NewOwner({ onSave }) {
  const [name, setName] = useState("");
  const [entityType, setEntityType] = useState("");
  const [ownerType, setOwnerType] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (loading) return;

    setLoading(true);
    const newOwner = { name, entityType, ownerType, address, totalLandHoldings: 0, files: [] };
    onSave(newOwner);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">New Owner</h2>
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Entity Type
        </label>
        <select
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Select Entity Type
          </option>
          {entityTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Owner Type
        </label>
        <select
          value={ownerType}
          onChange={(e) => setOwnerType(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Select Owner Type
          </option>
          {ownerTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <Input
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload File
        </label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <Button
        text="Save"
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      />
    </div>
  );
}
