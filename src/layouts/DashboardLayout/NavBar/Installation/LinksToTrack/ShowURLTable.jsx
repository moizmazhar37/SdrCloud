import React from "react";
import "./LinksToTrack.css";
import ApiConfig from "../../../../../../src/config/APIConfig";

const ShowURLTable = ({ urls }) => {
  return (
    <div className="show-url-table">
      <h3>Tracked URLs</h3>
      <table className="url-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {urls.length === 0 ? (
            <tr>
              <td colSpan="2">No URLs to display</td>
            </tr>
          ) : (
            urls.map((urlObj) => (
              <tr key={urlObj.id} className="url-row">
                <td>{urlObj.id}</td>
                <td>{urlObj.url}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowURLTable;
