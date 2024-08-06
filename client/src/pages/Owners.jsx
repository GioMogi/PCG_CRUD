import { useState, useEffect } from "react";
import axios from "axios";

export default function Owners() {
  const [owners, setOwners] = useState([]);
  const [name, setName] = useState("");
  const [entityType, setEntityType] = useState("");
  const [ownerType, setOwnerType] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchOwners = async () => {
      const response = await axios.get("/api/owners");
      setOwners(response.data);
    };
    fetchOwners();
  }, []);

  const handleCreateOwner = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/owners", {
      name,
      entityType,
      ownerType,
      address,
    });
    setOwners([...owners, response.data]);
  };

  const handleDeleteOwner = async (id) => {
    await axios.delete(`/api/owners/${id}`);
    setOwners(owners.filter((owner) => owner._id !== id));
  };

  return (
    <div>
      <h1>Owners</h1>
      <form onSubmit={handleCreateOwner}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Entity Type"
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Owner Type"
          value={ownerType}
          onChange={(e) => setOwnerType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Create Owner</button>
      </form>
      <ul>
        {owners.map((owner) => (
          <li key={owner._id}>
            {owner.name} - {owner.address}
            <button onClick={() => handleDeleteOwner(owner._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
