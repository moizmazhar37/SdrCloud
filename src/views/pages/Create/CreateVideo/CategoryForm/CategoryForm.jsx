import React, { useState, useMemo, useEffect } from "react";
import styles from "./CategoryForm.module.scss";
import CategoryDropdown from "src/views/pages/Create/CreateVideo/CategoryDropdown/CategoryDropdown";
import useGetCategories from "../hooks/useGetCategories";
import useGetSheets from "../hooks/useGetSheets";
import { useCreateTemplate } from "../hooks/useCreateTemplate";
import { useConnectSheet } from "../hooks/useConnectSheet";

const CategoryForm = () => {
  const [category, setCategory] = useState(null);
  const [ingestionSource, setIngestionSource] = useState(null);
  const [templateName, setTemplateName] = useState("");
  const [showError, setShowError] = useState(false);
  const [templateId, setTemplateId] = useState(null);

  const { data: categoryData, loading: categoriesLoading } = useGetCategories();
  const { data: sheetData, loading: sheetsLoading } = useGetSheets();
  const { createTemplate, loading: createLoading } = useCreateTemplate();
  const { connectSheet, loading: connectLoading } = useConnectSheet();

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
    if (!templateName.trim()) {
      setShowError(true);
      return;
    }

    setShowError(false);
    try {
      const response = await createTemplate({ templateName, category });
      if (response?.id) {
        setTemplateId(response.id); // Update state with the template ID
        console.log("Template created with ID:", response.id);
      }
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };

  const handleConnect = async () => {
    if (!templateId || !ingestionSource) return;

    try {
      await connectSheet({
        sheet_id: ingestionSource,
        template_id: templateId,
      });
      console.log("Sheet connected successfully!");
    } catch (error) {
      console.error("Error connecting sheet:", error);
    }
  };

  // Log templateId when it updates
  useEffect(() => {
    if (templateId) {
      console.log("Updated Template ID:", templateId);
    }
  }, [templateId]);

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        <div className={styles.topSection}>
          <div className={styles.categorySection}>
            <h2 className={styles.sectionTitle}>Category</h2>
            {!categoriesLoading && (
              <CategoryDropdown
                options={categories}
                buttonText="Select Category"
                onSelect={setCategory}
                allowAddNew={true}
              />
            )}
          </div>
          <div className={styles.templateSection}>
            <h2 className={styles.sectionTitle}>Template Name</h2>
            <div className={styles.templateInputContainer}>
              <div className={styles.inputWithButton}>
                <input
                  type="text"
                  placeholder="Enter Template Name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className={styles.templateInput}
                />
                <button
                  onClick={handleSave}
                  className={styles.saveButton}
                  disabled={!templateName.trim() || !category || createLoading}
                >
                  Save
                </button>
              </div>
              {showError && (
                <p className={styles.errorMessage}>Template Name is required</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.ingestionSection}>
          <h2 className={styles.sectionTitle}>Ingestion</h2>
          <div className={styles.ingestionWrapper}>
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
              className={styles.connectButton}
              disabled={!templateId || !ingestionSource || connectLoading}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
