import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setParsedData([]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      setParsedData(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Upload failed or server error.");
    }
  };

  return (
    <div className="upload-container">
      <h2>📤 Upload Excel/CSV File</h2>
      <input type="file" onChange={handleFileChange} accept=".xlsx,.xls,.csv" />
      <button onClick={handleUpload}>Upload</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {parsedData.length > 0 && (
        <div>
          <h3>📊 Parsed Data</h3>
          <table border="1">
            <thead>
              <tr>
                {Object.keys(parsedData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
