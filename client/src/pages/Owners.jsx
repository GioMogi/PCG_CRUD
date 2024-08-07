import { useState, useEffect } from "react";
import api from "../services/api";
import OwnersList from "../components/SideBar";
import NewOwner from "../components/NewOwner";
import SelectedOwner from "../components/SelectedOwner";
import Modal from "../components/Modal";
import EditOwner from "../components/EditOwner";

export default function Owners() {
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleCreateOwner = async (owner) => {
    try {
      console.log("creating owner with date:", owner);
      const response = await api.post("/owners", owner);
      console.log("Owner created:", response.data);
      setOwners([...owners, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response) {
        console.error("Error creating owner:", error.response.data); // Log the response data in case of error
      } else {
        console.error("Error creating owner:", error.message);
      }
    }
  };

  const handleSelectOwner = async (id) => {
    try {
      const response = await api.get(`/owners/${id}`);
      setSelectedOwner(response.data);
    } catch (error) {
      console.error("Error fetching owner details", error);
    }
  };

  const handleEditOwner = (owner) => {
    setSelectedOwner(owner);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (id, updatedOwner) => {
    try {
      const response = await api.put(`/owners/${id}`, updatedOwner);
      setOwners(
        owners.map((owner) => (owner._id === id ? response.data : owner))
      );
      setSelectedOwner(response.data);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating owner", error);
    }
  };

  const handleDeleteOwner = async (id) => {
    try {
      await api.delete(`/owners/${id}`);
      setOwners(owners.filter((owner) => owner._id !== id));
      setSelectedOwner(null);
    } catch (error) {
      console.error("Error deleting owner:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <OwnersList
        owners={owners}
        onSelectOwner={handleSelectOwner}
        onAddOwner={() => setIsModalOpen(true)}
      />
      <div className="flex-1 p-4">
        <SelectedOwner
          owner={selectedOwner}
          onEditOwner={handleEditOwner}
          onDeleteOwner={handleDeleteOwner}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewOwner onSave={handleCreateOwner} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {selectedOwner && (
          <EditOwner
            owner={selectedOwner}
            onSave={handleSaveEdit}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}
