import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "src/Common/Card/Card";
import Table from "src/Common/Table/Table";
import Dropdown from "src/Common/Dropdown/Dropdown";
import hvo from "src/images/Hvo.png";
import video from "src/images/video.png";
import useTemplateList from "./Hooks/useTemplateList";
import styles from "./Create.module.scss";

const Create = () => {
  const history = useHistory();
  const { data, loading, error } = useTemplateList();
  const [activeTab, setActiveTab] = useState("VIDEO");

  const headers = [
    { label: "Template Name", key: "template_name" },
    { label: "Type", key: "template_type" },
    { label: "Creation Date", key: "created_at" },
    { label: "Categories", key: "category_name" },
    { label: "Total Records", key: "total_records" },
    { label: "Sent", key: "sent" },
    { label: "Action", key: "actions" },
  ];

  const tableData =
    data[activeTab]?.map((row) => ({
      ...row,
      category_name: (
        <div className={styles.categoryContainer}>
          {row.category_name.split(",").map((category, index) => (
            <div key={index} className={styles.categoryBadge}>
              {category}
            </div>
          ))}
        </div>
      ),
      sent: "--",
      actions: (
        <Dropdown
          options={[
            {
              label: "View",
              value: "view",
              onClick: () => {
                console.log("Clicked");
              },
            },
          ]}
          buttonText="View"
        />
      ),
    })) || [];

  return (
    <div>
      <div className={styles.cardsContainer}>
        <Card
          image={video}
          text={"Create Video Template"}
          onClick={() => {
            history.push("/createtemplate&Video");
          }}
        />
        <Card
          image={hvo}
          text={"Create HVO Template"}
          onClick={() => {
            history.push("/create-hvo-template");
          }}
        />
      </div>

      <div className={styles.radioGroup}>
        <button
          className={styles.radioButton}
          style={{
            backgroundColor: activeTab === "VIDEO" ? "#0358AC" : "white",
            color: activeTab === "VIDEO" ? "white" : "#666",
          }}
          onClick={() => setActiveTab("VIDEO")}
        >
          Video
        </button>
        <button
          className={styles.radioButton}
          style={{
            backgroundColor: activeTab === "HVO" ? "#0358AC" : "white",
            color: activeTab === "HVO" ? "white" : "#666",
          }}
          onClick={() => setActiveTab("HVO")}
        >
          HVO
        </button>
      </div>

      {!loading && (
        <div className={styles.tableContainer}>
          <Table headers={headers} data={tableData} />
        </div>
      )}
    </div>
  );
};

export default Create;
