import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowURLTable from "./ShowURLTable";
import "./LinksToTrack.css";
import ApiConfig from "src/config/APIConfig";

const LinksToTrack = () => {
  const [trackedUrls, setTrackedUrls] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchTrackedUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get(ApiConfig.getUrls, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response?.status === 200) {
          setTrackedUrls(response.data);
        }
      } catch (error) {
        console.error("Error fetching tracked URLs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackedUrls();
  }, []);

  const handleSave = async () => {
    if (newUrl.trim() !== "") {
      try {
        const response = await axios.post(
          ApiConfig.addUrl,
          { url: newUrl },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.status === 200) {
          setIsSuccess(true);
          setStatusMessage("Saved successfully!");
          setTrackedUrls([...trackedUrls, response.data]);
          setNewUrl("");
        } else {
          setIsSuccess(false);
          setStatusMessage("Error saving URL.");
        }
      } catch (error) {
        console.error("Error saving URL:", error);
        setIsSuccess(false);
        setStatusMessage("Error saving URL.");
      } finally {
        setTimeout(() => setStatusMessage(""), 3000);
      }
    }
  };

  const handleDelete = (id) => {
    setTrackedUrls(trackedUrls.filter((url) => url.id !== id));
  };

  return (
    <div className="links-to-track">
      <div className="table-section">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ShowURLTable urls={trackedUrls} onDelete={handleDelete} />
        )}
        <div className="add-url-section">
          <input
            type="text"
            className="url-input"
            placeholder="Enter URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button className="add-btn" onClick={handleSave}>
            +
          </button>
        </div>
        {/* Display status message */}
        {statusMessage && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: isSuccess ? "green" : "red",
            }}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default LinksToTrack;
