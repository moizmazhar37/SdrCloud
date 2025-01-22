import React, { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm/CategoryForm";
import SectionArea from "./SectionArea/SectionArea";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useGetSheets from "./hooks/useGetSheets";
import styles from "./CreateVideo.module.scss";
import ImageUpload from "./CategoryForm/ImageUpload/ImageUpload";
import VideoUpload from "./CategoryForm/VideoUpload/VideoUpload";
import StaticURL from "./CategoryForm/StaticURL/StaticURL";
import DynamicURL from "./CategoryForm/DynamicURL/DynamicURL";
import useGetSheetData from "../Hooks/useGetSheetData";
import SectionCard from "./SectionCard/SectionCard";
import useGetSections from "../Hooks/useGetSection";
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

  const url = new URL(window.location.href);
  useEffect(() => {
    setTemplateId(url.searchParams.get("templateId"));
  }, []);

  useEffect(() => {
    if (templateId) {
      const newUrl = `/createtemplate&Video?templateId=${templateId}`;
      window.history.pushState({}, "", newUrl);
    }
  }, [templateId]);

  const { data: sheetData, loading: sheetsLoading } = useGetSheets();
  const { data, loading, error } = useGetSheetData(
    isSheetConnected ? templateId : null
  );

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
    setSaveTriggered((prev) => !prev); // Refresh section data
    setShowImageUpload(false); // Close ImageUpload after successful save
  };

  const handleSheetConnectSuccess = (sheetId) => {
    setIsSheetConnected(true);
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
          />
          {showImageUpload && (
            <ImageUpload
              categories={imageCategories}
              templateId={templateId}
              sectionNumber={sectionNum}
              onSaveSuccess={handleSaveSuccess}
              onClose={() => setShowImageUpload(false)} // Close on manual trigger
            />
          )}
          {showVideoUpload && (
            <VideoUpload
              templateId={templateId}
              categories={videoCategories}
              sectionNumber={sectionNum}
              onSaveSuccess={handleSaveSuccess}
            />
          )}
          {showStaticURL && (
            <StaticURL
              categories={staticUrlCategories}
              templateId={templateId}
              sectionNumber={sectionNum}
              onSaveSuccess={handleSaveSuccess}
            />
          )}
          {showDynamicURL && (
            <DynamicURL
              categories={dynamicUrlCategories}
              templateId={templateId}
              sectionNumber={sectionNum}
              onSaveSuccess={handleSaveSuccess}
            />
          )}
          <div className={styles.cardContainer}>
            {elementsList?.map((element) => (
              <SectionCard
                key={element.id}
                sectionNumber={element.section_number}
                sectionName={element.section_name}
                templateId={element.template_id}
                duration={element.duration}
                scroll={element.scroll}
                previewContent={element.value}
              />
            ))}
          </div>
        </div>
        <div className={styles.rightComponent}>
          <SectionArea
            initialOptions={initialOptions}
            onSectionTypeChange={handleSectionTypeChange}
            editable={isSheetConnected}
            templateId={templateId}
            elementsList={elementsList}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
