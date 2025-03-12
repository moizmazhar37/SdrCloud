import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./integration.module.scss";

const Integration = () => {
  const history = useHistory();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    // Check if user type is "USER" in local storage
    const userType = localStorage.getItem("UserType");
    setIsUser(userType === "USER");
  }, []);

  const sources = [
    { name: "Google Sheets", status: "Enabled", path: "/googlesheets" },
    {
      name: "SendGrid",
      status: isUser ? "Disabled" : "Enabled",
      path: "/sendgrid",
    },
    {
      name: "Calender Link",
      status: isUser ? "Disabled" : "Enabled",
      path: "/calenderlink",
    },
  ];

  const navs = [
    { text: "Settings", route: "/settings" },
    { text: "Integration", route: "/integrations" },
  ];

  const handleRowClick = (source) => {
    // Only navigate if the source is enabled
    if (source.status === "Enabled") {
      history.push(source.path);
    }
  };

  return (
    <>
      <DynamicNavigator items={navs} />
      <div className={styles.container}>
        <div className={styles.breadcrumbNav}></div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Ingestion Settings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.sourceTypeRow}>
                <p className={styles.sourceTypeText}>Source Type</p>
              </td>
            </tr>
            <tr>
              <td className={styles.tableRow}>
                <div className={styles.servicesContainer}>
                  {sources.map((source, index) => (
                    <div
                      className={`${styles.servicesRow} ${
                        source.status === "Disabled" ? styles.disabledRow : ""
                      }`}
                      key={index}
                      onClick={() => handleRowClick(source)}
                      style={{
                        cursor:
                          source.status === "Enabled" ? "pointer" : "default",
                      }}
                    >
                      <div className={styles.serviceNameStatus}>
                        <p className={styles.servicesText}>{source.name}</p>
                        <span
                          className={
                            source.status === "Enabled"
                              ? styles.statusEnabled
                              : styles.statusDisabled
                          }
                        >
                          {source.status}
                        </span>
                      </div>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`${styles.arrowIcon} ${
                          source.status === "Disabled"
                            ? styles.disabledIcon
                            : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Integration;
