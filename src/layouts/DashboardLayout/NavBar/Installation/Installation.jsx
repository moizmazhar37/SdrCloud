import React, { useState } from "react";
import "./Leads.css";

const Installation= () => {
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
          className={`tab ${activeTab === "Cookie Consent" ? "active" : ""}`}
          onClick={() => setActiveTab("Cookie Consent")}
        >
          Cookie Consent
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
        {activeTab === "Cookie Consent" && (
          <div>
            <p>Cookie consent functionality will be here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Installation;
