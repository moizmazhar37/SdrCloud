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

  const { data: sheetData, loading: sheetsLoading } = useGetSheets();
  const navigationItems = [
    { text: "Template", route: "/CreateTemplate" },
    { text: "New Video Template", route: "/createtemplate&Video" },
  ];

  const categories = [
    { label: "Category 1", value: "Category 1" },
    { label: "Category 2", value: "Category 2" },
    { label: "Category 3", value: "Category 3" },
  ];

  const initialOptions = [
    { label: "Image", value: "image" },
    { label: "Video", value: "video" },
    { label: "Static URL", value: "static_url" },
    { label: "Dynamic URL", value: "dynamic_url" },
  ];

  const handleSectionTypeChange = (selectedValue) => {
    setShowImageUpload(selectedValue === "image");
    setShowVideoUpload(selectedValue === "video");
    setShowStaticURL(selectedValue === "static_url");
  };

  const handleTemplateSave = (id) => {
    setTemplateId(id);
  };
  const { data, loading, error } = useGetSheetData(templateId);
  console.log(data);
  console.log("========", templateId);

  return (
    <>
      <div className={styles.wrapper}>
        <DynamicNavigator items={navigationItems} />
        <div className={styles.container}>
          <div className={styles.leftComponent}>
            <CategoryForm
              sheetData={sheetData}
              sheetsLoading={sheetsLoading}
              onTemplateSave={handleTemplateSave}
            />
            {showImageUpload && (
              <ImageUpload
                categories={categories}
                onSave={() => console.log("Save data: Image Upload")}
                templateId={templateId}
              />
            )}
            {showVideoUpload && templateId && (
              <VideoUpload
                categories={categories}
                onSave={() => console.log("Save data: Video Upload")}
              />
            )}
            {showStaticURL && (
              <StaticURL templateId={templateId} categories={categories} />
            )}
          </div>
          <div className={styles.rightComponent}>
            <SectionArea
              initialOptions={initialOptions}
              onSectionTypeChange={handleSectionTypeChange}
              editable={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateVideo;
