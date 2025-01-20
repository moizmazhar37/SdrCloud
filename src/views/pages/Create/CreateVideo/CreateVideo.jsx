import React, { useState } from "react";
import CategoryForm from "./CategoryForm/CategoryForm";
import SectionArea from "./SectionArea/SectionArea";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import useGetSheets from "./hooks/useGetSheets";
import styles from "./CreateVideo.module.scss";
import ImageUpload from "./CategoryForm/ImageUpload/ImageUpload";
import VideoUpload from "./CategoryForm/VideoUpload/VideoUpload";
import StaticURL from "./CategoryForm/StaticURL/StaticURL";
import useGetSheetData from "../Hooks/useGetSheetData";

const CreateVideo = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [showStaticURL, setShowStaticURL] = useState(false);
  const [templateId, setTemplateId] = useState(null);
  const [connectedSheetId, setConnectedSheetId] = useState(null);
  const [isSheetConnected, setIsSheetConnected] = useState(false);
  const [sectionNum, setSectionNum] = useState(null);

  const { data: sheetData, loading: sheetsLoading } = useGetSheets();
  const { data, loading, error } = useGetSheetData(
    isSheetConnected ? templateId : null
  );

  // Extract values by data type
  const extractCategories = (type) => {
    if (!data || !Array.isArray(data)) {
      console.warn("Data is null or not an array");
      return [];
    }
    return data
      .filter((item) => item.dataType === type)
      .map((item) => ({ label: item.value, value: item.value }));
  };

  const imageCategories = extractCategories("Image URL");
  const staticUrlCategories = extractCategories("Static URL");
  const dynamicUrlCategories = extractCategories("Dynamic URL");
  const videoCategories = extractCategories("Video URL");

  const navigationItems = [
    { text: "Template", route: "/CreateTemplate" },
    { text: "New Video Template", route: "/createtemplate&Video" },
  ];

  const initialOptions = [
    { label: "UPLOAD IMAGE", value: "image" },
    { label: "VIDEO CLIPS", value: "video" },
    { label: "STATIC URL", value: "static_url" },
    { label: "DYNAMIC URL", value: "dynamic_url" },
  ];

  const handleSectionTypeChange = (selectedValue, sectionNumber) => {
    setSectionNum(sectionNumber);
    console.log(
      `Selected option: ${selectedValue}, Section number: ${sectionNumber}`
    );

    setShowImageUpload(selectedValue === "image");
    setShowVideoUpload(selectedValue === "video");
    setShowStaticURL(selectedValue === "static_url");
  };

  const handleTemplateSave = (id) => {
    setTemplateId(id);
  };

  const handleSheetConnectSuccess = (sheetId) => {
    setIsSheetConnected(true);
    setConnectedSheetId(sheetId);
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
            />
          )}
          {showVideoUpload && (
            <VideoUpload
              templateId={templateId}
              categories={videoCategories}
              sectionNumber={sectionNum}
            />
          )}
          {showStaticURL && (
            <StaticURL
              categories={staticUrlCategories}
              templateId={templateId}
            />
          )}
        </div>
        <div className={styles.rightComponent}>
          <SectionArea
            initialOptions={initialOptions}
            onSectionTypeChange={handleSectionTypeChange}
            editable={isSheetConnected}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
