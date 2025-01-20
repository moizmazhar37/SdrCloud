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
import SectionCard from "./SectionCard/SectionCard";

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

  const elementsList = [
    {
      id: "3871d0e0-5db6-4870-902b-eaa5faf8251d",
      section_number: 2,
      duration: 8.0,
      audio_url: "",
      status: "PROCESSING",
      first_row_value: null,
      is_dynamic: true,
      updated_at: "2025-01-13T13:22:19.194269",
      template_id: "263eb248-5d72-4253-965a-a99271427e14",
      section_name: "DYNAMIC URL",
      sequence: 1,
      audio_embedded: false,
      audio_description: "Hello [FIRST_NAME] [LAST_NAME]",
      scroll: true,
      value: "BANNER_CTA_URL2",
      created_at: "2025-01-13T13:22:19.194269",
    },
    {
      id: "21023bf0-18cf-442e-b75e-3fca37761942",
      section_number: 4,
      duration: 13.96,
      audio_url: "",
      status: "PROCESSING",
      first_row_value: null,
      is_dynamic: false,
      updated_at: "2025-01-13T13:23:52.088339",
      template_id: "263eb248-5d72-4253-965a-a99271427e14",
      section_name: "VIDEO CLIPS",
      sequence: 3,
      audio_embedded: false,
      audio_description: "",
      scroll: false,
      value: "https://storage.googleapis.com/static-data-for-sdrc/uploads/e0653e5d-a70a-41e0-9706-4764f27ae886/3195394-uhd_3840_2160_25fps_20241129164858_20250113132345.mp4",
      created_at: "2025-01-13T13:23:52.088339",
    },
    {
      id: "14f4f206-c934-4eb9-871f-a098fab6fd2c",
      section_number: 3,
      duration: 5.0,
      audio_url: "https://storage.googleapis.com/static-data-for-sdrc/uploads/e0653e5d-a70a-41e0-9706-4764f27ae886/TunePocket-Breaking-World-News-Logo-3-Preview_20250113132835.mp3",
      status: "PROCESSING",
      first_row_value: null,
      is_dynamic: true,
      updated_at: "2025-01-13T13:28:40.969603",
      template_id: "263eb248-5d72-4253-965a-a99271427e14",
      section_name: "UPLOAD IMAGE",
      sequence: 3,
      audio_embedded: true,
      audio_description: "",
      scroll: false,
      value: "RIGHT_TEXT_LEFT_IMAGE",
      created_at: "2025-01-13T13:28:40.969603",
    },
    {
      id: "14f4f206-c934-4eb9-871f-a098fab6fd2c",
      section_number: 3,
      duration: 5.0,
      audio_url: "https://storage.googleapis.com/static-data-for-sdrc/uploads/e0653e5d-a70a-41e0-9706-4764f27ae886/TunePocket-Breaking-World-News-Logo-3-Preview_20250113132835.mp3",
      status: "PROCESSING",
      first_row_value: null,
      is_dynamic: true,
      updated_at: "2025-01-13T13:28:40.969603",
      template_id: "263eb248-5d72-4253-965a-a99271427e14",
      section_name: "UPLOAD IMAGE",
      sequence: 3,
      audio_embedded: true,
      audio_description: "",
      scroll: false,
      value: "RIGHT_TEXT_LEFT_IMAGE",
      created_at: "2025-01-13T13:28:40.969603",
    },
  ]

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
          <div className={styles.cardContainer}>
          {elementsList.map((element) => (
            <SectionCard
              key={element.id}
              sectionNumber={element.section_number}
              sectionName={element.section_name}
              templateId={element.template_id}
              duration={element.duration}
              scroll={element.scroll}
              previewContent={element.value}
            // onDelete={() => handleDelete(element.id)}
            />
          ))}
        </div>
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
