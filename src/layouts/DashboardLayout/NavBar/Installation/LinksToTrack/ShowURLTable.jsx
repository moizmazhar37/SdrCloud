import React from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./LinksToTrack.css";
import ApiConfig from "../../../../../../src/config/APIConfig";

const ShowURLTable = ({ urls, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${ApiConfig.getUrls}?url_id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onDelete(id);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  return (
    <div className="show-url-table">
      <h3>Tracked URLs</h3>
      <table className="url-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.length === 0 ? (
            <tr>
              <td colSpan="3">No URLs to display</td>
            </tr>
          ) : (
            urls.map((urlObj) => (
              <tr key={urlObj.id} className="url-row">
                <td>{urlObj.id}</td>
                <td>{urlObj.url}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(urlObj.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowURLTable;
