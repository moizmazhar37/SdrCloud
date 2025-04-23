import React, { useContext, useState } from "react";
import styles from "./TabularCard.module.scss";
import useUserSelect from "src/views/pages/DashboardAdmin/MainDashboard/Hooks/useUserSelect";
import { UserContext } from "src/context/User";
import CreateUser from "src/views/pages/CompanyUsers/Users/CreateUser/CreateUser";

const TabularCard = ({
  title,
  usersData,
  tableHeaders,
}) => {

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isCreateUserOpen, setCreateUserOpen] = useState(false);
  const [viewState, setViewState] = useState("create");

  const user2=useContext(UserContext)
  const [isViewingAs, setIsViewingAs] = useState(
    sessionStorage.getItem("isViewingAs") === "true"
  );
  const [viewingUser, setViewingUser] = useState(
    isViewingAs ? JSON.parse(sessionStorage.getItem("slaveUser")) : null
  );

  const handleUserSelect = useUserSelect({
    setIsViewingAs,
    setViewingUser,
    isViewingAs,
  });

  const handleCreateUserSuccess = () => {
    setCreateUserOpen(false);
  };

  const handleEditView = (user) => {
    setSelectedUserId(user.id); // or however the user ID is stored
    setViewState("edit");
    setCreateUserOpen(true);
  };
  

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
                  {tableHeaders.map((header) => {
                    const value = user[header.key];

                    if (header.key === "viewAs") {
                      return (
                        <td key={header.key} className={styles[`${header.key}Cell`]}>
                          <span
                            className={styles.linkAction}
                            onClick={() => handleUserSelect(user)}
                          >
                            View As
                          </span>
                        </td>
                      );
                    }

                    if (header.key === "editUser") {
                      return (
                        <td key={header.key} className={styles[`${header.key}Cell`]}>
                          <span
                            className={styles.linkAction}
                            onClick={() => handleEditView(user)}
                          >
                            Edit User
                          </span>
                        </td>
                      );
                    }

                    return (
                      <td key={header.key} className={styles[`${header.key}Cell`]}>
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
                        ) : value !== null && value !== undefined ? (
                          <span className={styles.userName}>{value}</span>
                        ) : (
                          "-"
                        )}
                      </td>
                    );
                  })}
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

      {isCreateUserOpen && (
        <CreateUser
          isOpen={isCreateUserOpen}
          onClose={() => setCreateUserOpen(false)}
          onSuccess={handleCreateUserSuccess}
          userId={selectedUserId}
          viewState={viewState}
        />
      )}
    </div>
  );
};

export default TabularCard;
