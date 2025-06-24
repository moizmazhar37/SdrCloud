import React, { useState } from "react";
import styles from "./Domains.module.scss";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useAuthenticateDomain from "./Hooks/useAuthenticateDomain";
import useVerifyDomain from "./Hooks/useVerifyDomain";

const Domains = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [domainInput, setDomainInput] = useState("");
  const [domainData, setDomainData] = useState([]);
  const [domainInfo, setDomainInfo] = useState(null);

  const { authenticateDomain, loading: isAuthenticating } =
    useAuthenticateDomain();
  const { verifyToken, loading: isVerifying } = useVerifyDomain();

  const navs = [
    { text: "Settings", route: "/settings" },
    { text: "Integration", route: "/integrations" },
    { text: "Domains", route: "/domains" },
  ];

  const handleAuthenticate = async () => {
    if (!domainInput.trim()) return;

    const response = await authenticateDomain(domainInput.trim());

    if (response) {
      // Store domain information
      setDomainInfo({
        domain_id: response.domain_id,
        domain: response.domain,
      });
      const recordsData = response.dns_records || [];

      if (recordsData.length > 0) {
        setDomainData(recordsData);
        setCurrentStep(2);
      } else {
        console.log("Authentication successful but no DNS records found");
        setDomainData([]);
        setCurrentStep(2);
      }
    }
  };

  const handleVerify = async () => {
    const response = await verifyToken();

    if (response) {
      console.log("Verification successful:", response);
    }
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
  };

  const handleBack = () => {
    setCurrentStep(1);
    setDomainInput("");
    setDomainData([]);
    setDomainInfo(null);
  };

  const getStatusBadge = (valid) => {
    return (
      <span
        className={`${styles.statusBadge} ${
          valid ? styles.valid : styles.invalid
        }`}
      >
        {valid ? "Valid" : "Invalid"}
      </span>
    );
  };

  return (
    <>
      <DynamicNavigator items={navs} />
      <div className={styles.domainsContainer}>
        <div className={styles.formCard}>
          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            <div
              className={`${styles.step} ${
                currentStep >= 1 ? styles.active : ""
              }`}
            >
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepLabel}>Set Domain</span>
            </div>
            <div className={styles.stepConnector}></div>
            <div
              className={`${styles.step} ${
                currentStep >= 2 ? styles.active : ""
              }`}
            >
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepLabel}>Domain Records</span>
            </div>
          </div>

          {/* Step 1: Set Domain */}
          {currentStep === 1 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Authenticate Domain</h2>
              <p className={styles.stepDescription}>
                Please enter the domain name you want to authenticate and get
                detailed DNS records information.
              </p>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Enter domain name (e.g., example.com)"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  className={styles.domainInput}
                  onKeyPress={(e) => e.key === "Enter" && handleAuthenticate()}
                />
                <button
                  onClick={handleAuthenticate}
                  disabled={!domainInput.trim() || isAuthenticating}
                  className={styles.authenticateButton}
                >
                  {isAuthenticating ? (
                    <>
                      <div className={styles.spinner}></div>
                      Authenticating...
                    </>
                  ) : (
                    "Authenticate Domain"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Domain Records Information */}
          {currentStep === 2 && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div>
                  <h2 className={styles.stepTitle}>DNS Records</h2>
                  {domainInfo && (
                    <p className={styles.domainName}>
                      Domain: <strong>{domainInfo.domain}</strong> (ID:{" "}
                      {domainInfo.domain_id})
                    </p>
                  )}
                </div>
                <div className={styles.headerButtons}>
                  <button
                    className={styles.verifyButton}
                    onClick={handleVerify}
                    disabled={isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <div className={styles.spinner}></div>
                        Verifying...
                      </>
                    ) : (
                      "Verify"
                    )}
                  </button>
                  <button onClick={handleBack} className={styles.backButton}>
                    ← Back to Search
                  </button>
                </div>
              </div>

              <div className={styles.domainTable}>
                {domainData.map((record, index) => (
                  <div key={index} className={styles.tableRow}>
                    <div className={styles.recordHeader}>
                      <div className={styles.recordInfo}>
                        <div className={styles.recordHost}>
                          <span className={styles.label}>Host:</span>
                          <span className={styles.value}>{record.host}</span>
                          <button
                            onClick={() => handleCopy(record.host)}
                            className={styles.copyButton}
                            title="Copy host to clipboard"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect
                                x="9"
                                y="9"
                                width="13"
                                height="13"
                                rx="2"
                                ry="2"
                              ></rect>
                              <path d="m5 5 6 0 0 6"></path>
                            </svg>
                          </button>
                        </div>
                        <div className={styles.recordMeta}>
                          <span className={styles.recordType}>
                            {record.type.toUpperCase()}
                          </span>
                          {getStatusBadge(record.valid)}
                        </div>
                      </div>
                    </div>

                    <div className={styles.recordData}>
                      <span className={styles.label}>Data:</span>
                      <div className={styles.dataContainer}>
                        <span className={styles.dataValue}>{record.data}</span>
                        <button
                          onClick={() => handleCopy(record.data)}
                          className={styles.copyButton}
                          title="Copy data to clipboard"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="m5 5 6 0 0 6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Domains;
