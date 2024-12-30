// TopUsers.jsx
import React from 'react';
import Dropdown from 'src/Common/Dropdown/Dropdown';
import styles from './TabularCard.module.scss';

const TopUsers = () => {
  const dropdownOptions = [
    {
      label: "Monthly",
      onClick: () => console.log("Monthly selected")
    }
  ];

  const users = [
    {
      name: "Grand Rapids",
      credits: "$6,320",
      score: 100,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "Bell Gardens",
      credits: "$6,471",
      score: 50,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "Broomfield",
      credits: "$2,223.9",
      score: 20,
      avatar: "/api/placeholder/32/32"
    },
    // Add more users to demonstrate scrolling
    {
      name: "User 4",
      credits: "$1,500",
      score: 15,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "User 5",
      credits: "$1,200",
      score: 10,
      avatar: "/api/placeholder/32/32"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Top performing users</h1>
        <Dropdown options={dropdownOptions} />
      </div>
      
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.nameColumn}>Name</th>
              <th className={styles.creditsColumn}>Credits used</th>
              <th className={styles.scoreColumn}>Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className={styles.nameCell}>
                  <div className={styles.userInfo}>
                    <img 
                      src={user.avatar} 
                      alt="" 
                      className={styles.avatar}
                    />
                    <span className={styles.userName}>{user.name}</span>
                  </div>
                </td>
                <td className={styles.creditsCell}>{user.credits}</td>
                <td className={styles.scoreCell}>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopUsers;
