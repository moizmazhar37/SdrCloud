import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import "./PrivacyPolicyPage.scss"; // Import SCSS file

const PrivacyPolicyPage = () => {
  const [tenantData, setTenantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const tenant_id = window.location.href.split("/").pop().trim();

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${ApiConfig.privacyPolicy}/${tenant_id}`);
        setTenantData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching tenant data:", err);
        setError("Failed to load tenant data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenantData();
  }, [tenant_id]);

  if (isLoading) {
    return (
      <div className="privacy-container loading">
        <p>Loading privacy policy...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="privacy-container error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p>
        Welcome to our Privacy Policy page. Your privacy is important to us. This
        document explains how we collect, use, and protect your personal information.
      </p>

      <div className="privacy-details">
        <h2>Contact Information</h2>
        <p>
          <strong>Company Website:</strong>{" "}
          <a href={tenantData.company_url} target="_blank" rel="noopener noreferrer">
            {tenantData.company_url}
          </a>
        </p>
        <p>
          <strong>Phone:</strong> {tenantData.phone}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${tenantData.email}`}>{tenantData.email}</a>
        </p>
      </div>

      <div className="policy-section">
        <h2>What Information Do We Collect?</h2>
        <p>
          We collect personal data such as email addresses, phone numbers, and company
          details to provide our services effectively.
        </p>
      </div>

      <div className="policy-section">
        <h2>How Do We Use Your Information?</h2>
        <p>
          We use collected data to improve user experience, provide customer support,
          and ensure the security of our services.
        </p>
      </div>

      <div className="policy-section">
        <h2>Data Security</h2>
        <p>
          Your information is securely stored, and we take all necessary precautions to
          prevent unauthorized access.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
