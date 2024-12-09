import React, { useState } from "react";
import "./LinksToTrack.css";

const AddURL = ({ isChildStateChanged }) => {
  const [urls, setUrls] = useState([""]);

  const handleAddField = () => {
    setUrls([...urls, ""]);
  };

  const handleInputChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSave = () => {
    const nonEmptyUrls = urls.filter((url) => url.trim() !== "");
    setUrls([""]);
    isChildStateChanged(true);
  };

  return (
    <div className="add-url">
      <h3>Add URLs</h3>
      {urls.map((url, index) => (
        <div key={index} className="url-field">
          <input
            type="text"
            value={url}
            placeholder="Enter URL here"
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="url-input"
          />
        </div>
      ))}
      <div className="button-container">
        <button onClick={handleAddField} className="add-btn">
          Add Field
        </button>
        <button onClick={handleSave} className="save-btn">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddURL;
