import React, { useState } from "react";
import axios from "axios";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [pii, setPii] = useState(null);

  const handleUpload = async (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    const formData = new FormData();
    formData.append("file", selected);
    const res = await axios.post("http://localhost:8000/detect_pii/", formData);
    setPii(res.data.pii);
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <input type="file" onChange={handleUpload} />
      {pii && (
        <div className="mt-2">
          <h3 className="font-semibold">Detected PII:</h3>
          <pre>{JSON.stringify(pii, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
