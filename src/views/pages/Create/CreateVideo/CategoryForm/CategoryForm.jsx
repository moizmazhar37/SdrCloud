import React, { useState, useMemo, useEffect } from "react";
import styles from "./CategoryForm.module.scss";
import CategoryDropdown from "src/views/pages/Create/CreateVideo/CategoryDropdown/CategoryDropdown";
import useGetCategories from "../../Hooks/useGetCategories";
import { useCreateTemplate } from "../hooks/useCreateTemplate";
import { useConnectSheet } from "../hooks/useConnectSheet";
import useDeleteCategory from "../hooks/useDeleteCategory";
import useEditCategory from "../../Hooks/useEditCategoey";
import InfoBox from "src/Common/InfoBox/InfoBox";

const CategoryForm = ({
  sheetData,
  sheetsLoading,
  onTemplateSave,
  onSheetConnectSuccess,
  sectionData,
  template_id,
  isViewMode,
}) => {
  const [category, setCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
  const [ingestionSource, setIngestionSource] = useState(null);
  const [templateName, setTemplateName] = useState("");
  const [showError, setShowError] = useState(false);
  const [templateId, setTemplateId] = useState(null);
  const [localCategories, setLocalCategories] = useState([]);

  const [createModeName, setCreateModeName] = useState(null);
  const [createModeId, setCreateModeId] = useState(null);
  const {
    data: categoryData,
    loading: categoriesLoading,
    refetch: refetchCategories,
  } = useGetCategories();

  const { createTemplate, loading: createLoading } = useCreateTemplate();
  const { connectSheet, loading: connectLoading } = useConnectSheet();
  const { deleteCategory, loading: deleteLoading } =
    useDeleteCategory(refetchCategories);
  const { editCategory, loading: editLoading } = useEditCategory();

  const categories = useMemo(
    () =>
      categoryData?.map((item) => ({
        label: item.category_name,
        value: item.id,
        id: item.id,
      })) || [],
    [categoryData]
  );

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const sheets = useMemo(
    () =>
      sheetData?.map((item) => ({
        label: item.title,
        value: item.id,
      })) || [],
    [sheetData]
  );

  useEffect(() => {
    if (sectionData && isViewMode) {
      setTemplateName(sectionData.getVideo?.hvoTemplateName || "");
      setCategory(sectionData.getVideo?.categoryName || null);
      setCategoryId(sectionData.getVideo?.categoryId || null);
      setIngestionSource(sectionData.sheet?.title || null);
      setTemplateId(template_id);
    }
  }, [sectionData, isViewMode, template_id]);

  const handleSave = async () => {
    if (!templateName.trim()) {
      setShowError(true);
      return;
    }

    setShowError(false);

    if (isViewMode) {
      try {
        await editCategory(template_id, categoryId, templateName);
        setIsEditingTemplate(false);
      } catch (error) {
        console.error("Error editing template:", error);
      }
    } else {
      try {
        const response = await createTemplate({ templateName, categoryId });
        if (response?.id) {
          setTemplateId(response.id);
          onTemplateSave(response.id);
          setIsEditingTemplate(false);
        }
      } catch (error) {
        console.error("Error creating template:", error);
      }
    }
  };

  const handleConnect = async () => {
    if (!templateId || !ingestionSource) return;

    try {
      await connectSheet({
        sheet_id: ingestionSource,
        template_id: templateId,
      });
      onSheetConnectSuccess();
    } catch (error) {
      console.error("Error connecting sheet:", error);
    }
  };

  const handleView = () => {
    const fetchUrl = sectionData.sheet.fetchUrl;
    window.open(fetchUrl, "_blank");
  };

  const handleCategoryDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setLocalCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
      if (category === categoryId) {
        setCategory(null);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleCategorySelect = (selectedValue) => {
    const selectedCategory = localCategories.find(
      (cat) => cat.value === selectedValue
    );
    if (selectedCategory) {
      setCategory(selectedCategory.label);
      setCategoryId(selectedCategory.id);
      setIsEditingCategory(false);
    }
  };

  const showIngestionControls =
    !isViewMode || (isViewMode && !sectionData?.sheet?.googleSheetsId);

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        <div className={styles.topSection}>
          <div className={styles.categorySection}>
            <h2 className={styles.sectionTitle}>
              Category
              <InfoBox text={"Select Template Category from given list"} />
            </h2>
            {!categoriesLoading && !isViewMode && (
              <CategoryDropdown
                options={localCategories}
                buttonText="Select Category"
                onSelect={handleCategorySelect}
                onDelete={handleCategoryDelete}
                allowAddNew={true}
              />
            )}
            {isViewMode && !isEditingCategory && (
              <div className={styles.viewModeContainer}>
                <span>{category}</span>
                <button
                  onClick={() => setIsEditingCategory(true)}
                  className={styles.editButton}
                >
                  Edit
                </button>
              </div>
            )}
            {isViewMode && isEditingCategory && (
              <CategoryDropdown
                options={localCategories}
                buttonText="Select New Category"
                onSelect={handleCategorySelect}
                onDelete={handleCategoryDelete}
                allowAddNew={true}
              />
            )}
          </div>
          <div className={styles.templateSection}>
            <h2 className={styles.sectionTitle}>Template Name</h2>
            {!isViewMode && (
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
                    disabled={
                      !templateName.trim() || !category || createLoading
                    }
                  >
                    Save
                  </button>
                </div>
                {showError && (
                  <p className={styles.errorMessage}>
                    Template Name is required
                  </p>
                )}
              </div>
            )}
            {isViewMode && !isEditingTemplate && (
              <div className={styles.viewModeContainer}>
                <span>{templateName}</span>
                <button
                  onClick={() => setIsEditingTemplate(true)}
                  className={styles.editButton}
                >
                  Edit
                </button>
              </div>
            )}
            {isViewMode && isEditingTemplate && (
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
                    disabled={!templateName.trim() || !category || editLoading}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.ingestionSection}>
          <h2 className={styles.sectionTitle}>
            Ingestion{" "}
            <InfoBox
              text={
                "Select from available google sheets and click connect to enable sections."
              }
            />
          </h2>
          <div className={styles.ingestionWrapper}>
            {showIngestionControls && !sheetsLoading && (
              <>
                <CategoryDropdown
                  options={sheets}
                  buttonText="Select Ingestion Source"
                  onSelect={setIngestionSource}
                  allowAddNew={false}
                />
                <button
                  onClick={handleConnect}
                  className={styles.connectButton}
                  disabled={!templateId || !ingestionSource || connectLoading}
                >
                  Connect
                </button>
              </>
            )}
            {isViewMode && sectionData?.sheet?.googleSheetsId && (
              <div className={styles.viewModeContainer}>
                <span>{ingestionSource}</span>
                <div className={styles.actionButtons}>
                  <button onClick={handleView} className={styles.viewButton}>
                    View
                  </button>
                  <button
                    onClick={handleConnect}
                    className={styles.disconnectButton}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
