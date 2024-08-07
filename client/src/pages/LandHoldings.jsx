import React, { useState, useEffect } from "react";
import api from "../services/api";
import NewLandHolding from "../components/NewLandHolding";

const titleSourceOptions = ["Class A", "Class B", "Class C", "Class D"];

export default function LandHoldings() {
  const [landHoldings, setLandHoldings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [file, setFile] = useState(null);

  console.log("LandHoldings component rendered");

  useEffect(() => {
    console.log("landholdings component mounted");
    const fetchLandHoldings = async () => {
      try {
        console.log("fetching land holdings...");
        const response = await api.get("/landholdings");
        console.log("Fetched Land Holdings", response.data);
        setLandHoldings(response.data);
      } catch (error) {
        console.error("Error fetching land holdings:", error);
      }
    };
    fetchLandHoldings();
  }, []);

  const handleDeleteLandHolding = async (id) => {
    try {
      await api.delete(`/landholdings/${id}`);
      setLandHoldings((prev) =>
        prev.filter((landHolding) => landHolding._id !== id)
      );
    } catch (error) {
      console.error("Error deleting land holding:", error);
    }
  };

  const handleEditLandHolding = (id) => {
    const landHolding = landHoldings.find((lh) => lh._id === id);
    setEditingId(id);
    setEditingData({ ...landHolding });
    setFile(null);
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await api.put(`/landholdings/${id}`, editingData);

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await api.post(`/landholdings/${id}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      const updatedLandHoldingResponse = await api.get(`/landholdings/${id}`);
      const updatedLandHolding = updatedLandHoldingResponse.data;

      setLandHoldings((prev) =>
        prev.map((landHolding) =>
          landHolding._id === id ? updatedLandHolding : landHolding
        )
      );
      setEditingId(null);
      setEditingData({});
      setFile(null);
    } catch (error) {
      console.error("Error saving land holding:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCreateLandHolding = (createdLandHolding) => {
    setLandHoldings((prev) => [
      ...prev.filter((lh) => lh._id !== createdLandHolding._id),
      createdLandHolding,
    ]);
  };

  return (
    <div className="p-4">
      <NewLandHolding onSave={handleCreateLandHolding} />
      <div className="text-center my-4">
        <h2 className="text-xl font-bold mb-4">Land Holdings</h2>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Owner</th>
            <th className="py-2 px-4 border-b">Legal Entity</th>
            <th className="py-2 px-4 border-b text-center">
              Net Mineral Acres
            </th>
            <th className="py-2 px-4 border-b">Mineral Owner Royalty (%)</th>
            <th className="py-2 px-4 border-b">Section Name</th>
            <th className="py-2 px-4 border-b">Section</th>
            <th className="py-2 px-4 border-b">Township</th>
            <th className="py-2 px-4 border-b">Range</th>
            <th className="py-2 px-4 border-b">Title Source</th>
            <th className="py-2 px-4 border-b">Files</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {landHoldings.map((landHolding) => (
            <tr key={landHolding._id}>
              {editingId === landHolding._id ? (
                <>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="name"
                      value={editingData.name}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    {landHolding.owner ? landHolding.owner.name : "No owner"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="legalEntity"
                      value={editingData.legalEntity}
                      onChange={handleChange}
                      className="w-20 text-center"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <input
                      type="number"
                      name="netMineralAcres"
                      value={editingData.netMineralAcres}
                      onChange={handleChange}
                      className="w-16 text-center"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      name="mineralOwnerRoyalty"
                      value={editingData.mineralOwnerRoyalty}
                      onChange={handleChange}
                      className="w-16 text-center"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="sectionName"
                      value={editingData.sectionName}
                      onChange={handleChange}
                      className="text-center"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="section"
                      value={editingData.section}
                      onChange={handleChange}
                      className="w-16 text-center"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="township"
                      value={editingData.township}
                      onChange={handleChange}
                      className="w-16 text-center"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="range"
                      value={editingData.range}
                      onChange={handleChange}
                      className="w-16 text-center"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      name="titleSource"
                      value={editingData.titleSource}
                      onChange={handleChange}
                      className="w-13 py-1 px-2 border rounded text-center"
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
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex justify-center">
                      <input type="file" onChange={handleFileChange} />
                    </div>
                    {editingData.files &&
                      editingData.files.map((file, index) => (
                        <div key={index}>
                          <a
                            href={`/uploads/${file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file}
                          </a>
                        </div>
                      ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleSaveEdit(landHolding._id)}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border-b text-center">
                    {landHolding.name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {landHolding.owner ? landHolding.owner.name : "No owner"}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {landHolding.legalEntity}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {landHolding.netMineralAcres}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {landHolding.mineralOwnerRoyalty}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {landHolding.sectionName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {landHolding.section}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {landHolding.township}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {landHolding.range}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {landHolding.titleSource}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {landHolding.files &&
                      landHolding.files.map((file, index) => (
                        <div key={index}>
                          <a
                            href={`/uploads/${file}`} // This should correctly point to /uploads/filename
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file}
                          </a>
                        </div>
                      ))}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleEditLandHolding(landHolding._id)}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLandHolding(landHolding._id)}
                      className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
