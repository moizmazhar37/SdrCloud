import React from "react";
import Dropdown from "src/Common/Dropdown/Dropdown";
import styles from "./TabularCard.module.scss";

const TabularCard = ({
  title,
  dropdownOptions = [],
  usersData,
  tableHeaders,
  buttonText,
  showDropdown = true, // Default value is true
}) => {
  if (
    !tableHeaders ||
    !Array.isArray(tableHeaders) ||
    tableHeaders.length === 0
  ) {
    console.error("Invalid tableHeaders prop.");
    return <p>Error: No table headers available</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {showDropdown && (
          <Dropdown options={dropdownOptions} buttonText={buttonText} />
        )}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header.key} className={styles[`${header.key}Column`]}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersData && usersData.length > 0 ? (
              usersData.map((user, index) => (
                <tr key={index}>
                  {tableHeaders.map((header) => (
                    <td
                      key={header.key}
                      className={styles[`${header.key}Cell`]}
                    >
                      {header.key === "name" ? (
                        <div className={styles.userInfo}>
                          {user.image && (
                            <img
                              src={user.image}
                              alt="User avatar"
                              className={styles.avatar}
                            />
                          )}
                          <span className={styles.userName}>{user.name}</span>
                        </div>
                      ) : user[header.key] !== null &&
                        user[header.key] !== undefined ? (
                        user[header.key]
                      ) : (
                        "-"
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className={styles.noData}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabularCard;
