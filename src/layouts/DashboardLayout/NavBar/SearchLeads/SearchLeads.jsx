import React, { useState } from "react";
import useLeads from "./useLeads";
import Table from "src/Common/Table/Table";
import SearchFilters from "../SearchFilters/SearchFilters";
import "./SearchLeads.css";
import Pagination from "src/Common/Pagination/Pagination";

export default function SearchLeads() {
  const { leads, loading, error } = useLeads();
  const [selectedRows, setSelectedRows] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Add your logic here (e.g., fetching data for the new page)
  };

  const headers = [
    { label: "Full Name", key: "full_name" },
    { label: "Email", key: "email" },
    { label: "Address", key: "address" },
    { label: "Location", key: "location" },
    { label: "Demographics", key: "demographics" },
    { label: "Financial", key: "financial" },
    { label: "Actions", key: "actions" },
  ];

  // Transform the leads data into the required format expected by table
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
      <div className="sub-container">
        <SearchFilters />
        <Table
          headers={headers}
          data={transformedData}
          onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
          selectedRows={selectedRows}
        />
      </div>
    </div>
  );
}
