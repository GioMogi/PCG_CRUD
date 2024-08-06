import { useState } from "react";
import axios from "axios";

export default function FileUpload({ ownerId }) {
  const [file, setFile] = useState(null);

  const handlFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `/api/owners/${ownerId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handlFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
}
