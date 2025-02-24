import React, { useState, useEffect } from "react";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";
import "./Leads.css";
import LinksToTrack from "./LinksToTrack/LinksToTrack";

const Installation = () => {
  const [activeTab, setActiveTab] = useState("Installation");
  const [tenantId, setTenantId] = useState("");
  const [scriptUrl, setScriptUrl] = useState("Loading script...");

  useEffect(() => {
    const getProfileHandler = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: ApiConfig.profile,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res?.status === 200) {
          const data = res?.data;
          setTenantId(data?.tenant_id); 
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    getProfileHandler();
  }, []);

  useEffect(() => {
    if (tenantId === "b3995e7d-a4a7-4005-88a5-75443af5d9be") {
      setScriptUrl("https://storage.googleapis.com/static-data-for-sdrc/scripts/2feb965f-d046-4f5d-94fa-92103d886a46.js");
    } else if (tenantId) {
      setScriptUrl(
        `https://storage.googleapis.com/static-data-for-sdrc/scripts/tracker_${tenantId}.js`
      );
    }
  }, [tenantId]);

  return (
    <div className="leads-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "Installation" ? "active" : ""}`}
          onClick={() => setActiveTab("Installation")}
        >
          Installation
        </button>
        <button
          className={`tab ${activeTab === "Links To Track" ? "active" : ""}`}
          onClick={() => setActiveTab("Links To Track")}
        >
          Links To Track
        </button>
      </div>
      <div className="content">
        {activeTab === "Installation" && (
          <div>
            <p>
              Insert this HTML into each of your HTML pages. Paste this below
              the <code>&lt;Title&gt;</code> tag within the HTML.
            </p>
            <textarea className="installation-textarea" value={scriptUrl} />
          </div>
        )}
        {activeTab === "Links To Track" && (
          <div>
            <LinksToTrack />
          </div>
        )}
      </div>
    </div>
  );
};

export default Installation;
