import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "src/Common/Card/Card";
import Table from "src/Common/Table/Table";
import Dropdown from "src/Common/Dropdown/Dropdown";
import hvo from "src/images/Hvo.png";
import video from "src/images/video.png";
import useTemplateList from "./Hooks/useTemplateList";
import useDeleteTemplate from "./Hooks/useDeleteTemplate";
import WarningModal from "src/Common/Modal/Modal";
import Loader from "src/Common/Loader/Loader";
import styles from "./Create.module.scss";

const Create = () => {
  const history = useHistory();
  const { data, loading, refetch } = useTemplateList();
  const { deleteTemplate, loading: deleting } = useDeleteTemplate(refetch);
  const [activeTab, setActiveTab] = useState("VIDEO");
  const [modalData, setModalData] = useState({ isOpen: false, id: null });

  const headers = [
    { label: "Template Name", key: "template_name" },
    { label: "Type", key: "template_type" },
    { label: "Creation Date", key: "created_at" },
    { label: "Categories", key: "category_name" },
    { label: "Total Records", key: "total_records" },
    { label: "Sent", key: "sent" },
    { label: "Action", key: "actions" },
  ];

  const handleDelete = async (id) => {
    setModalData({ isOpen: false, id: null });
    await deleteTemplate(id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const tableData =
    data[activeTab]?.map((row) => ({
      ...row,
      created_at: formatDate(row.created_at),
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
                const route =
                  activeTab === "HVO"
                    ? "/create-hvo-template"
                    : "/createtemplate&Video";
                history.push({
                  pathname: route,
                  state: "summary",
                  search: `templateId=${row.id}`,
                });
              },
            },
            {
              label: "Delete",
              value: "delete",
              onClick: () => setModalData({ isOpen: true, id: row.id }),
            },
          ]}
          buttonText={"Actions"}
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

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loaderWrapper}>{<Loader size={160} />}</div>
        ) : (
          <Table headers={headers} data={tableData} />
        )}
      </div>

      <WarningModal
        isOpen={modalData.isOpen}
        message="Please be aware that this action is irreversible. By clicking the 'Delete' button below, you will permanently delete this tempelate from the system. Note that you will not be able to retrieve or restore it in the future."
        onCancel={() => setModalData({ isOpen: false, id: null })}
        onDelete={() => handleDelete(modalData.id)}
      />
    </div>
  );
};

export default Create;
