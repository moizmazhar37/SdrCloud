import React from "react";
import { useHistory } from "react-router-dom";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./integration.module.scss";

const Integration = () => {
  const history = useHistory();

  const sources = [
    { name: "Google Sheets", status: "Enabled", path: "/googlesheets" },
    { name: "SFTP", status: "Disabled", path: "#" },
    { name: "API", status: "Disabled", path: "#" },
    { name: "Hubspot", status: "Disabled", path: "#" },
    { name: "Salesforce", status: "Disabled", path: "#" },
  ];

  const navs = [{text:"Settings" , route:"/settings"},
    {text:"Integration" , route:"/integrations"}
  ];

  return (
    <><DynamicNavigator items={navs} /><div className={styles.container}>
      <div className={styles.breadcrumbNav}>
      </div>
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
                    className={styles.servicesRow}
                    key={index}
                    onClick={() => history.push(source.path)}
                  >
                    <div className={styles.serviceNameStatus}>
                      <p className={styles.servicesText}>{source.name}</p>
                      <span
                        className={source.status === "Enabled"
                          ? styles.statusEnabled
                          : styles.statusDisabled}
                      >
                        {source.status}
                      </span>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={styles.arrowIcon} />
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div></>
  );
};

export default Integration;
