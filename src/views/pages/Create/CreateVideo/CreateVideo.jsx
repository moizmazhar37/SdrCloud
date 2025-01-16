import React, { useState } from "react";
import CategoryForm from "./CategoryForm/CategoryForm";
import SectionArea from "./SectionArea/SectionArea";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import styles from "./CreateVideo.module.scss";
import ImageUpload from "./CategoryForm/ImageUpload/ImageUpload";
import VideoUpload from "./CategoryForm/VideoUpload/VideoUpload";
import StaticURL from "./CategoryForm/StaticURL/StaticURL";

const CreateVideo = () => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [showStaticURL, setShowStaticURL] = useState(false);

  const navigationItems = [
    { text: "Template", route: "/CreateTemplate" },
    { text: "New Video Template", route: "/createtemplate&Video" },
  ];

  const categories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
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

  return (
    <>
      <div className={styles.wrapper}>
        <DynamicNavigator items={navigationItems} />
        <div className={styles.container}>
          <div className={styles.leftComponent}>
            <CategoryForm />
            {showImageUpload && (
              <ImageUpload
                categories={categories}
                onSave={() => console.log("Save data: Image Upload")}
              />
            )}
            {showVideoUpload && (
              <VideoUpload
                categories={categories}
                onSave={() => console.log("Save data: Video Upload")}
              />
            )}
            {showStaticURL && <StaticURL categories={categories} />}
          </div>
          <div className={styles.rightComponent}>
            <SectionArea
              initialOptions={initialOptions}
              onSectionTypeChange={handleSectionTypeChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateVideo;
