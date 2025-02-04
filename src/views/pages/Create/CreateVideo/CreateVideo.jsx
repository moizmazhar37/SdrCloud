import React, { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm/CategoryForm";
import SectionArea from "./SectionArea/SectionArea";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useGetSheets from "../Hooks/useGetSheets";
import styles from "./CreateVideo.module.scss";
import ImageUpload from "./ImageUpload/ImageUpload";
import VideoUpload from "./VideoUpload/VideoUpload";
import StaticURL from "./StaticURL/StaticURL";
import DynamicURL from "./DynamicURL/DynamicURL";
import useGetSheetData from "../Hooks/useGetSheetData";
import SectionCard from "./SectionCard/SectionCard";
import SectionCardContainer from "./SectionCard/SectionCardContainer";
import useGetSections from "../Hooks/useGetSection";
import useCreateVideo from "./hooks/useCreateVideo";
import ConfirmationModal from "src/Common/ConfirmationModal/ConfirmationModal";
import {
  extractCategories,
  navigationItems,
  initialOptions,
  getAudioCategories,
} from "./helpers";

const CreateVideo = () => {
  // Form visibility states
  const [activeForm, setActiveForm] = useState(null); // 'image', 'video', 'static_url', 'dynamic_url'
  const [templateId, setTemplateId] = useState(null);
  const [isSheetConnected, setIsSheetConnected] = useState(false);
  const [sectionNum, setSectionNum] = useState(null);
  const [saveTriggered, setSaveTriggered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const { handleCreateVideo, isLoading } = useCreateVideo();

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
      const newUrl = `/createtemplate&Video?templateId=${templateId}`;
      if (isSheetConnected) window.history.pushState({}, "", newUrl);
    }
  }, [templateId]);

  const { data: sheetData, loading: sheetsLoading } = useGetSheets();
  const { data, loading, error } = useGetSheetData(templateId, saveTriggered);
  const {
    data: sectionData,
    loading: sectionLoading,
    error: sectionError,
  } = useGetSections(templateId, saveTriggered);

  const elementsList = sectionData?.elementsList;
  // Extract categories
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
  };

  const handleSectionTypeChange = (selectedValue, sectionNumber) => {
    // Reset all edit-related states when opening from section area
    setEditingSection(null);
    setIsEditMode(false);
    setSectionNum(sectionNumber);
    console.log(selectedValue);
    // Set the active form based on selection
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

  const handleEdit = (section) => {
    // Set edit mode states
    setIsEditMode(true);
    setEditingSection(section);
    setSectionNum(section.sequence);
    console.log(section.section_name);
    // Set the active form based on section type
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

  const handleCloseForm = () => {
    resetAllStates();
  };

  const handleTemplateSave = (id) => {
    setTemplateId(id);
  };

  const handleSaveSuccess = () => {
    setSaveTriggered((prev) => !prev);
    resetAllStates();
  };

  const handleSheetConnectSuccess = () => {
    setIsSheetConnected(true);
    setIsViewMode(true);
    setSaveTriggered((prev) => !prev);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleProceed = () => {
    handleCreateVideo(templateId);
    setIsModalOpen(false);
  };

  const isEditable = Boolean(isViewMode || isSheetConnected);

  const confirmationText =
    sectionData?.price > sectionData?.balance
      ? "You have insufficient balance to create the videos."
      : "You have sufficient balance to create the videos.";

  const renderActiveForm = () => {
    const commonProps = {
      templateId,
      sectionNumber: sectionNum,
      onSaveSuccess: handleSaveSuccess,
      onClose: handleCloseForm,
      editData: isEditMode ? editingSection : null,
      audioCategories,
      onEditReset: () => {
        setEditingSection(null);
        setIsEditMode(false);
      },
    };

    switch (activeForm) {
      case "image":
        return <ImageUpload {...commonProps} categories={imageCategories} />;
      case "video":
        return <VideoUpload {...commonProps} categories={videoCategories} />;
      case "static_url":
        return <StaticURL {...commonProps} categories={staticUrlCategories} />;
      case "dynamic_url":
        return (
          <DynamicURL {...commonProps} categories={dynamicUrlCategories} />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <DynamicNavigator items={navigationItems} />
      <div className={styles.container}>
        <div className={styles.leftComponent}>
          <CategoryForm
            sheetData={sheetData}
            sheetsLoading={sheetsLoading}
            onTemplateSave={handleTemplateSave}
            onSheetConnectSuccess={handleSheetConnectSuccess}
            sectionData={sectionData}
            isViewMode={isViewMode}
            template_id={templateId}
          />
          {renderActiveForm()}
          {elementsList && (
            <div>
              <div className={styles.cardContainer}>
                <SectionCardContainer
                  elementsList={elementsList}
                  setSaveTriggered={setSaveTriggered}
                  handleEdit={handleEdit}
                />
              </div>
              {elementsList.length > 0 && (
                <button
                  className={styles.createVideo}
                  onClick={() => setIsModalOpen(true)}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Video"}
                </button>
              )}
            </div>
          )}
        </div>
        <div className={styles.rightComponent}>
          <SectionArea
            initialOptions={initialOptions}
            onSectionTypeChange={handleSectionTypeChange}
            editable={isEditable}
            templateId={templateId}
            elementsList={elementsList}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Confirm Video Creation"
        infoItems={[
          { label: "Your balance", value: sectionData?.balance },
          {
            label: "Total price for generating videos",
            value: sectionData?.price,
          },
        ]}
        noteText={confirmationText}
        confirmationText="Please confirm if you want to proceed"
        onAction={handleProceed}
      />
    </div>
  );
};

export default CreateVideo;
