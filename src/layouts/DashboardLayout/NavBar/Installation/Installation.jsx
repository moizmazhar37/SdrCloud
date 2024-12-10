import React, { useState } from "react";
import "./Leads.css";
import LinksToTrack from "./LinksToTrack/LinksToTrack";

const Installation = () => {
  const [activeTab, setActiveTab] = useState("Installation");

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
            <textarea className="installation-textarea" />
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
