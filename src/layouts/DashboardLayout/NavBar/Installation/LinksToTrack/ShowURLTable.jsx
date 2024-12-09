import React from "react";
import "./LinksToTrack.css";

const ShowURLTable = ({ urls }) => {
  return (
    <div className="show-url-table">
      <h3>Tracked URLs</h3>
      <table className="url-table">
        <thead>
          <tr>
            <th>URL_ID</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {urls.length === 0 ? (
            <tr>
              <td colSpan="2">No URLs to display</td>
            </tr>
          ) : (
            urls.map((url, index) => (
              <tr key={index} className="url-row">
                <td>{index + 1}</td>
                <td>{url}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowURLTable;
