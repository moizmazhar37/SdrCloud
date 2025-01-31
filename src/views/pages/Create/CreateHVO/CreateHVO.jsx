import React, { useEffect, useState } from "react";
import SectionArea from "../CreateVideo/SectionArea/SectionArea";
import useGetSheetData from "../Hooks/useGetSheetData";
import useGetSheets from "../Hooks/useGetSheets";
import useGetSections from "../Hooks/useGetSection";
import styles from "./CreateHVO.module.scss";
import HVOCategoryForm from "./HVOCategoryForm/HVOCategoryForm";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import SectionCardContainer from "../CreateVideo/SectionCard/SectionCardContainer";
import {
  extractCategories,
  hvoNavigationItems,
  hvoInitialOptions,
  getAudioCategories,
} from "../CreateVideo/helpers";
import Header from "./Sections/Header/Header";
import HighlightBanner from "./Sections/HighlightBanner/HighlightBanner";
import TextImage from "./Sections/TextAndImage/TextAndImage";
import Footer from "./Sections/Footer/Footer";
const dynamicOptions = [
  {
    label: "ENT",
    value: "e04ac2ac-ae39-4cd7-bc30-e0a55818e09d",
    id: "e04ac2ac-ae39-4cd7-bc30-e0a55818e09d",
  },
  {
    label: "Startup",
    value: "93cd91e5-6abb-4535-94d9-d0401a225e03",
    id: "93cd91e5-6abb-4535-94d9-d0401a225e03",
  },
];

const CreateHVO = () => {
  const [templateId, setTemplateId] = useState(null);
  const [isSheetConnected, setIsSheetConnected] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [saveTriggered, setSaveTriggered] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [sectionNum, setSectionNum] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const { data: sheetData, loading: sheetsLoading } = useGetSheets("HVO");
  const { data, loading, error } = useGetSheetData(templateId, saveTriggered);
  const {
    data: sectionData,
    loading: sectionLoading,
    error: sectionError,
  } = useGetSections(templateId, saveTriggered);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("templateId");
    if (id) {
      setTemplateId(id);
      setIsViewMode(true);
    }
  }, []);

  useEffect(() => {
    if (templateId) {
      const newUrl = `/createtemplate&HVO?templateId=${templateId}`;
      if (isSheetConnected) window.history.pushState({}, "", newUrl);
    }
  }, [templateId]);

  const elementsList = sectionData?.elementsList;
  const imageCategories = extractCategories(data, "Image URL");
  const staticUrlCategories = extractCategories(data, "Static URL");
  const dynamicUrlCategories = extractCategories(data, "Dynamic URL");
  const videoCategories = extractCategories(data, "Video URL");
  const audioCategories = getAudioCategories(data);

  const resetAllStates = () => {
    setActiveForm(null);
    setEditingSection(null);
    setIsEditMode(false);
    setSectionNum(null);
    setSelectedSection(null);
  };

  const handleTemplateSave = (id) => {
    setTemplateId(id);
  };

  const handleSheetConnectSuccess = () => {
    setIsSheetConnected(true);
    setIsViewMode(true);
    setSaveTriggered((prev) => !prev);
  };

  const handleSaveSuccess = () => {
    setSaveTriggered((prev) => !prev);
    resetAllStates();
  };

  const handleEdit = (section) => {
    setIsEditMode(true);
    setEditingSection(section);
    setSectionNum(section.sequence);
    setSelectedSection(section.section_name);
  };

  const handleSectionTypeChange = (selectedValue, sectionNumber) => {
    setEditingSection(null);
    setIsEditMode(false);
    setSectionNum(sectionNumber);
    setSelectedSection(selectedValue);
  };

  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
    // Handle category selection logic here
  };

  const isEditable = Boolean(isViewMode || isSheetConnected);

  // In the renderSelectedSection function, add these cases:

  const dynamicFields = ["CUSTOMER_ORGANIZATION", "LAST_NAME"];

  const renderSelectedSection = () => {
    switch (selectedSection) {
      case "Header":
        return (
          <div className={styles.leftComponent}>
            {" "}
            <Header
              dynamicOptions={dynamicOptions}
              handleCategorySelect={handleCategorySelect}
            />
          </div>
        );
      case "Highlight Banner":
        return <HighlightBanner dynamicFields={dynamicFields} />;
      case "Right Text | Left Image":
        return (
          <div className={styles.leftComponent}>
            <TextImage
              dynamicImageOptions={imageCategories}
              dynamicFields={dynamicFields}
              isRightText={true}
            />
          </div>
        );
      case "Left Text | Right Image":
        return (
          <div className={styles.leftComponent}>
            <TextImage
              dynamicImageOptions={imageCategories}
              dynamicFields={dynamicFields}
              isRightText={false}
            />
          </div>
        );
      case "Footer":
        return (
          <div className={styles.leftComponent}>
            <Footer />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <DynamicNavigator items={hvoNavigationItems} />
      <div className={styles.container}>
        <div className={styles.leftComponent}>
          <HVOCategoryForm
            sheetData={sheetData}
            sheetsLoading={sheetsLoading}
            onTemplateSave={handleTemplateSave}
            onSheetConnectSuccess={handleSheetConnectSuccess}
            sectionData={sectionData}
            isViewMode={isViewMode}
            template_id={templateId}
          />
          {renderSelectedSection()}
          {elementsList && (
            <div>
              <div className={styles.cardContainer}>
                <SectionCardContainer
                  elementsList={elementsList}
                  setSaveTriggered={setSaveTriggered}
                  handleEdit={handleEdit}
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.rightComponent}>
          <SectionArea
            initialOptions={hvoInitialOptions}
            onSectionTypeChange={handleSectionTypeChange}
            editable={isEditable}
            templateId={templateId}
            elementsList={elementsList}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateHVO;
