import { useState, useMemo } from "react";
import styles from "./CategoryForm.module.scss";
import CategoryDropdown from "src/views/pages/Create/CreateVideo/CategoryDropdown/CategoryDropdown";
import useGetCategories from "../hooks/useGetCategories";
import useGetSheets from "../hooks/useGetSheets";
import { useCreateTemplate } from "../hooks/useCreateTemplate";
import { useConnectSheet } from "../hooks/useConnectSheet";

const CategoryForm = () => {
  const { data: categoryData, loading: categoriesLoading } = useGetCategories();
  const { data: sheetData, loading: sheetsLoading } = useGetSheets();
  const { createTemplate, loading: createLoading } = useCreateTemplate();
  const { connectSheet, loading: connectLoading } = useConnectSheet();

  const [category, setCategory] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [ingestionSource, setIngestionSource] = useState("");

  const isSaveDisabled = useMemo(() => !(category && templateName), [category, templateName]);
  const isConnectDisabled = useMemo(() => !ingestionSource, [ingestionSource]);

  const categories = useMemo(
    () =>
      categoryData?.map((item) => ({
        label: item.category_name,
        value: item.id,
      })) || [],
    [categoryData]
  );

  const sheets = useMemo(
    () =>
      sheetData?.map((item) => ({
        label: item.title,
        value: item.id,
      })) || [],
    [sheetData]
  );

  const handleSave = async () => {
    const payload = {
      categoryId: category,
      hvoTemplateName: templateName,
      templateType: "VIDEO",
    };

    try {
      await createTemplate(payload);
      setCategory("");
      setTemplateName("");
      setIngestionSource("");
    } catch (err) {
      console.error("Failed to create template:", err);
    }
  };

  const handleConnect = async () => {
    const payload = {
      sheet_id: ingestionSource,
      template_id: category,
      type: "VIDEO",
    };

    try {
      await connectSheet(payload);
      console.log("Sheet connected successfully!");
    } catch (err) {
      console.error("Failed to connect sheet:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Category</label>
            {!categoriesLoading && (
              <CategoryDropdown
                options={categories}
                buttonText="Select Category"
                onSelect={setCategory}
                allowAddNew={true}
              />
            )}
          </div>
          <div className={styles.field}>
            <label>Template Name</label>
            <div className={styles.inputWithButton}>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter Template Name"
                className={styles.input}
              />
              <button
                onClick={handleSave}
                disabled={isSaveDisabled || createLoading}
                className={`${styles.button} ${
                  isSaveDisabled || createLoading ? styles.disabled : ""
                }`}
              >
                {createLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Ingestion</label>
            {!sheetsLoading && (
              <CategoryDropdown
                options={sheets}
                buttonText="Select Ingestion Source"
                onSelect={setIngestionSource}
                allowAddNew={false}
              />
            )}
            <button
              onClick={handleConnect}
              disabled={isConnectDisabled || connectLoading}
              className={`${styles.button} ${
                isConnectDisabled || connectLoading ? styles.disabled : ""
              }`}
            >
              {connectLoading ? "Connecting..." : "Connect"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
