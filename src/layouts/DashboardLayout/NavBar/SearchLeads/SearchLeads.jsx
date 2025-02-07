import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import Table from "src/Common/Table/Table";
import "./SearchLeads.css";

export default function SearchLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ApiConfig.getUrls}/leads`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response?.status === 200) {
          setLeads(response.data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
        setStatusMessage("Failed to load leads.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Define headers for the new Table component format
  const headers = [
    { label: "Full Name", key: "full_name" },
    { label: "Email", key: "email" },
    { label: "Address", key: "address" },
    { label: "Location", key: "location" },
    { label: "Demographics", key: "demographics" },
    { label: "Financial", key: "financial" },
    { label: "Actions", key: "actions" },
  ];

  // Transform the leads data into the required format
  const transformedData = leads.map((lead) => ({
    full_name: `${lead.first_name} ${lead.last_name}`,
    email: lead.personal_email,
    address: `${lead.contact_address}${
      lead.contact_address_2 ? `, ${lead.contact_address_2}` : ""
    }`,
    location: `${lead.contact_metro_city}, ${lead.contact_state} ${
      lead.contact_zip
    }${lead.contact_zip4 ? `-${lead.contact_zip4}` : ""}`,
    demographics: `${lead.gender} | Age: ${lead.age_range}`,
    financial: `Income: ${lead.income_range} | Net Worth: ${lead.net_worth}`,
    actions: "View Details",
  }));

  return (
    <div className="searchleads-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          headers={headers}
          data={transformedData}
          onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
          selectedRows={selectedRows}
        />
      )}
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}
