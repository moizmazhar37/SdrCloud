import React, { useState } from "react";
import ShowURLTable from "./ShowURLTable";
import "./LinksToTrack.css";

const LinksToTrack = () => {
  const [trackedUrls, setTrackedUrls] = useState([
    "https://example.com",
    "https://anotherexample.com",
    "https://example.com",
    "https://anotherexample.com",
  ]);
  const [newUrls, setNewUrls] = useState([]);

  const handleAddField = () => {
    setNewUrls([...newUrls, ""]);
  };

  const handleInputChange = (index, value) => {
    const updatedUrls = [...newUrls];
    updatedUrls[index] = value;
    setNewUrls(updatedUrls);
  };

  const handleSave = async () => {
    const validUrls = newUrls.filter((url) => url.trim() !== "");

    if (validUrls.length > 0) {
      try {
        const response = await fetch("/api/add-urls", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urls: validUrls }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Saved successfully:", result);
          setTrackedUrls([...trackedUrls, ...validUrls]);
          setNewUrls([]);
        } else {
          console.error("Failed to save URLs");
        }
      } catch (error) {
        console.error("Error saving URLs:", error);
      }
    }
  };

  return (
    <div className="links-to-track">
      <div className="table-section">
        <ShowURLTable urls={trackedUrls} />
        <div className="add-url-section">
          {newUrls.map((url, index) => (
            <input
              key={index}
              type="text"
              className="url-input"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className="button-container">
          <button className="add-btn" onClick={handleAddField}>
            Add Field
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinksToTrack;
