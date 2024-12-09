import React, { useState } from "react";
import "./SearchLeads.css";
import LeadsTable from "./LeadsTable";

export default function SearchLeads() {
  const columns = [
    "Name",
    "Date",
    "Visited",
    "Location",
    "Site",
    "Source",
    "Keywords",
  ];

  const data = [
    {
      Name: "Roy Ericson",
      Visited: "11/12/2024 7:44:04 PM",
      Location: "Las Vegas, NV",
      Site: "bloxbunny.com",
      Source: "www.google.com",
      Keywords: "",
    },
    {
      Name: "Peggy Gan",
      Visited: "11/12/2024 1:40:08 PM",
      Location: "Alamo, CA",
      Site: "sdrcloud.ai",
      Source: "Direct",
      Keywords: "",
    },
    {
      Name: "Kim Cochran",
      Visited: "11/12/2024 5:27:52 AM",
      Location: "Scottsdale, AZ",
      Site: "bloxbunny.com",
      Source: "Direct",
      Keywords: "",
    },
    {
      Name: "Melvin Mathis",
      Visited: "11/12/2024 2:16:35 AM",
      Location: "Baltimore, MD",
      Site: "bloxbunny.com",
      Source: "www.google.com",
      Keywords: "",
    },
    {
      Name: "Fernando Walker",
      Visited: "11/11/2024 8:59:56 PM",
      Location: "Milwaukee, WI",
      Site: "bloxbunny.com",
      Source: "www.google.com",
      Keywords: "",
    },
    {
      Name: "Roy Ericson",
      Visited: "11/12/2024 7:44:04 PM",
      Location: "Las Vegas, NV",
      Site: "bloxbunny.com",
      Source: "www.google.com",
      Keywords: "",
    },
    {
      Name: "Peggy Gan",
      Visited: "11/12/2024 1:40:08 PM",
      Location: "Alamo, CA",
      Site: "sdrcloud.ai",
      Source: "Direct",
      Keywords: "",
    },
    {
      Name: "Kim Cochran",
      Visited: "11/12/2024 5:27:52 AM",
      Location: "Scottsdale, AZ",
      Site: "bloxbunny.com",
      Source: "Direct",
      Keywords: "",
    },
    {
      Name: "Melvin Mathis",
      Visited: "11/12/2024 2:16:35 AM",
      Location: "Baltimore, MD",
      Site: "bloxbunny.com",
      Source: "www.google.com",
      Keywords: "",
    },
    {
      Name: "Fernando Walker",
      Visited: "11/11/2024 8:59:56 PM",
      Location: "Milwaukee, WI",
      Site: "bloxbunny.com",
      Source: "www.google.com",
      Keywords: "",
    },
  ];

  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div className="searchleads-container">
      <div className="sub-container">
        <div className="header-box">
          <h1>Search Your Visitors</h1>
          <div className="export-section">
            <button className="export-btn">
              Export {selectedRows.length > 0 ? `(${selectedRows.length})` : ""}
            </button>
            <select className="dropdown">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
        </div>
        <LeadsTable
          data={data}
          columns={columns}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </div>
    </div>
  );
}
