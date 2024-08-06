import { useState, useEffect } from "react";
import axios from "axios";

export default function LandHoldings() {
  const [landHoldings, setLandHoldings] = useState([]);
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [legalEntity, setLegalEntity] = useState('');
  const [netMineralAcres, setNetMineralAcres] = useState('');
  const [mineralOwnerRoyalty, setMineralOwnerRoyalty] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [section, setSection] = useState('');
  const [township, setTownship] = useState('');
  const [range, setRange] = useState('');
  const [titleSource, setTitleSource] = useState('');

  useEffect(() => {
    const fetchLandHoldings = async () => {
      const response = await axios.get('/api/landholdings');
      setLandHoldings(response.data);
    };
    fetchLandHoldings();
  }, []);

  const handleCreateLandHolding = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/landholdings', {
      name,
      owner,
      legalEntity,
      netMineralAcres,
      mineralOwnerRoyalty,
      sectionName,
      section,
      township,
      range,
      titleSource
    });
    setLandHoldings([...landHoldings, response.data]);
  };

  const handleDeleteLandHolding = async (id) => {
    await axios.delete(`/api/landholdings/${id}`);
    setLandHoldings(landHoldings.filter((landHoldings) => landHoldings._id !== id));
  }

}