import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "../../../../config/APIConfig";

import "./SearchLeads.css";
import LeadsTable from "./LeadsTable";

export default function SearchLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
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

  const columns = [
    { Header: "First Name", accessor: "first_name" },
    { Header: "Last Name", accessor: "last_name" },
    { Header: "Personal Email", accessor: "personal_email" },
    { Header: "Address", accessor: "contact_address" },
    { Header: "Metro City", accessor: "contact_metro_city" },
    { Header: "State", accessor: "contact_state" },
    { Header: "Zip", accessor: "contact_zip" },
    { Header: "Zip-4", accessor: "contact_zip4" },
    { Header: "Gender", accessor: "gender" },
    { Header: "Age Range", accessor: "age_range" },
    { Header: "Income Range", accessor: "income_range" },
    { Header: "Net Worth", accessor: "net_worth" },
  ];

  const data = leads.map((lead) => ({
    first_name: lead.first_name,
    last_name: lead.last_name,
    personal_email: lead.personal_email,
    contact_address: lead.contact_address,
    contact_address_2: lead.contact_address_2,
    contact_metro_city: lead.contact_metro_city,
    contact_state: lead.contact_state,
    contact_zip: lead.contact_zip,
    contact_zip4: lead.contact_zip4,
    gender: lead.gender,
    age_range: lead.age_range,
    income_range: lead.income_range,
    net_worth: lead.net_worth,
  }));

  return (
    <div className="searchleads-container">
      <div className="sub-container">
        <div className="header-box">
          <h1>Search Your Visitors</h1>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <LeadsTable
            data={data}
            columns={columns}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        )}
        {statusMessage && <p>{statusMessage}</p>}
      </div>
    </div>
  );
}
