import React, { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm/CategoryForm";
import SectionArea from "./SectionArea/SectionArea";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useGetSheets from "./hooks/useGetSheets";
import styles from "./CreateVideo.module.scss";
import ImageUpload from "./ImageUpload/ImageUpload";
import VideoUpload from "./VideoUpload/VideoUpload";
import StaticURL from "./StaticURL/StaticURL";
import DynamicURL from "./DynamicURL/DynamicURL";
import useGetSheetData from "../Hooks/useGetSheetData";
import SectionCard from "./SectionCard/SectionCard";
import useGetSections from "../Hooks/useGetSection";
import useCreateVideo from "./hooks/useCreateVideo";
import ConfirmationModal from "src/Common/ConfirmationModal/ConfirmationModal";
import { extractCategories, navigationItems, initialOptions } from "./helpers";

const CreateVideo = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showDynamicURL, setShowDynamicURL] = useState(false);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [showStaticURL, setShowStaticURL] = useState(false);
  const [templateId, setTemplateId] = useState(null);
  const [isSheetConnected, setIsSheetConnected] = useState(false);
  const [sectionNum, setSectionNum] = useState(null);
  const [saveTriggered, setSaveTriggered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

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

  const imageCategories = extractCategories(data, "Image URL");
  const staticUrlCategories = extractCategories(data, "Static URL");
  const dynamicUrlCategories = extractCategories(data, "Dynamic URL");
  const videoCategories = extractCategories(data, "Video URL");

  const handleSectionTypeChange = (selectedValue, sectionNumber) => {
    setSectionNum(sectionNumber);
    setShowImageUpload(selectedValue === "image");
    setShowVideoUpload(selectedValue === "video");
    setShowStaticURL(selectedValue === "static_url");
    setShowDynamicURL(selectedValue === "dynamic_url");
  };

  const handleTemplateSave = (id) => {
    setTemplateId(id);
  };

  const handleSaveSuccess = () => {
    setSaveTriggered((prev) => !prev);
    setShowImageUpload(false);
    setShowVideoUpload(false);
    setShowStaticURL(false);
    setShowDynamicURL(false);
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
          {showImageUpload && (
            <ImageUpload
              categories={imageCategories}
              templateId={templateId}
              sectionNumber={sectionNum}
              onSaveSuccess={handleSaveSuccess}
              onClose={() => setShowImageUpload(false)}
            />
          )}
          {showVideoUpload && (
            <VideoUpload
              templateId={templateId}
              categories={videoCategories}
              sectionNumber={sectionNum}
              onSaveSuccess={handleSaveSuccess}
              onClose={() => setShowVideoUpload(false)}
            />
          )}
          {showStaticURL && (
            <StaticURL
              categories={staticUrlCategories}
              templateId={templateId}
              sectionNumber={sectionNum}
              onSaveSuccess={handleSaveSuccess}
              onClose={() => setShowStaticURL(false)}
            />
          )}
          {showDynamicURL && (
            <DynamicURL
              categories={dynamicUrlCategories}
              templateId={templateId}
              sectionNumber={sectionNum}
              onSaveSuccess={handleSaveSuccess}
              onClose={() => setShowDynamicURL(false)}
            />
          )}
          {elementsList && (
            <div>
              <div className={styles.cardContainer}>
                {elementsList?.map((element) => (
                  <SectionCard
                    key={element.id}
                    id={element.id}
                    sectionNumber={element.section_number}
                    sectionName={element.section_name}
                    duration={element.duration}
                    scroll={element.scroll}
                    previewContent={element.value}
                    onDeleteSuccess={() => setSaveTriggered((prev) => !prev)}
                  />
                ))}
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
