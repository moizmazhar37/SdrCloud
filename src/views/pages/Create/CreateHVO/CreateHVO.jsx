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

import Header from "./Sections/Header";
const CreateHVO = () => {
  // State management
  const [templateId, setTemplateId] = useState(null);
  const [isSheetConnected, setIsSheetConnected] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [saveTriggered, setSaveTriggered] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [sectionNum, setSectionNum] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Data fetching hooks
  const { data: sheetData, loading: sheetsLoading } = useGetSheets("HVO");
  const { data, loading, error } = useGetSheetData(templateId, saveTriggered);
  const {
    data: sectionData,
    loading: sectionLoading,
    error: sectionError,
  } = useGetSections(templateId, saveTriggered);

  // Check URL for template ID on mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("templateId");
    if (id) {
      setTemplateId(id);
      setIsViewMode(true);
    }
  }, []);

  // Update URL when template is connected
  useEffect(() => {
    if (templateId) {
      const newUrl = `/createtemplate&HVO?templateId=${templateId}`;
      if (isSheetConnected) window.history.pushState({}, "", newUrl);
    }
  }, [templateId]);

  const elementsList = sectionData?.elementsList;
  console.log("HVO ELEMENT LIST", elementsList);
  // Extract categories from data
  const imageCategories = extractCategories(data, "Image URL");
  const staticUrlCategories = extractCategories(data, "Static URL");
  const dynamicUrlCategories = extractCategories(data, "Dynamic URL");
  const videoCategories = extractCategories(data, "Video URL");
  const audioCategories = getAudioCategories(data);

  // Reset states
  const resetAllStates = () => {
    setActiveForm(null);
    setEditingSection(null);
    setIsEditMode(false);
    setSectionNum(null);
  };

  // Handlers
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

    switch (section.section_name) {
      case "IMAGE URL":
        setActiveForm("image");
        break;
      case "VIDEO URL":
        setActiveForm("video");
        break;
      case "Static URL":
        setActiveForm("static_url");
        break;
      case "Dynamic URL":
        setActiveForm("dynamic_url");
        break;
      default:
        setActiveForm(null);
        break;
    }
  };

  const handleSectionTypeChange = (selectedValue, sectionNumber) => {
    setEditingSection(null);
    setIsEditMode(false);
    setSectionNum(sectionNumber);

    switch (selectedValue) {
      case "image":
        setActiveForm("image");
        break;
      case "video":
        setActiveForm("video");
        break;
      case "static_url":
        setActiveForm("static_url");
        break;
      case "dynamic_url":
        setActiveForm("dynamic_url");
        break;
      default:
        setActiveForm(null);
        break;
    }
  };

  const isEditable = Boolean(isViewMode || isSheetConnected);

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
