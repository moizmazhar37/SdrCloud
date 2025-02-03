import React, { useEffect, useState, useCallback } from "react";
import SectionArea from "../CreateVideo/SectionArea/SectionArea";
import useGetSheetData from "../Hooks/useGetSheetData";
import useGetSheets from "../Hooks/useGetSheets";
import useHvoSections from "./Hooks/useGetHvoSections";
import useCompanyTenant from "../../settings/Company/Hooks/useCompanyTenant";
import styles from "./CreateHVO.module.scss";
import HVOCategoryForm from "./HVOCategoryForm/HVOCategoryForm";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import HvoSectionCardContainer from "./HvoSectionCard/HvoSectionCardContainer";
import {
  extractHvoCategories,
  hvoNavigationItems,
  hvoInitialOptions,
  extractKeywordList,
  HighlightBannerTypes,
  URLTypes,
} from "../CreateVideo/helpers";
import Header from "./Sections/Header/Header";
import HighlightBanner from "./Sections/HighlightBanner/HighlightBanner";
import TextImage from "./Sections/TextAndImage/TextAndImage";
import Footer from "./Sections/Footer/Footer";
import HighlightBanner2 from "./Sections/HighlightBanner2/HighlightBanner2";

const SECTION_TYPES = {
  RIGHT_TEXT_LEFT_IMAGE: "Right Text | Left Image",
  LEFT_TEXT_RIGHT_IMAGE: "Left Text | Right Image",
  HEADER: "Header",
  HIGHLIGHT_BANNER: "Highlight Banner",
  HIGHLIGHT_BANNER_2: "Highlight Banner 2",
  FOOTER: "Footer",
};

const CreateHVO = () => {
  const [templateId, setTemplateId] = useState(null);
  const [isSheetConnected, setIsSheetConnected] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [sectionUpdateTrigger, setSectionUpdateTrigger] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [sectionNum, setSectionNum] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const { data: sheetData, loading: sheetsLoading } = useGetSheets("HVO");
  const { data, loading, error } = useGetSheetData(templateId);
  const { data: tenantData, loading: tenantLoading } = useCompanyTenant();
  const {
    data: sectionData,
    loading: sectionLoading,
    error: sectionError,
  } = useHvoSections(templateId, sectionUpdateTrigger);

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

  const handleSectionUpdate = useCallback(() => {
    setSectionUpdateTrigger((prev) => !prev);
  }, []);

  const elementsList = Array.isArray(sectionData?.elementsList)
    ? sectionData.elementsList
    : [];

  const dynamicField = extractKeywordList(data, HighlightBannerTypes);
  const dynamicURL = extractKeywordList(data, URLTypes);
  const HeaderTypes = extractHvoCategories(data, ["Logo"]);
  const ImageDropdownTypes = extractHvoCategories(data, [
    "Screenshot from URL",
    "Image URL",
  ]);

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
  };

  const handleCloseSection = () => {
    resetAllStates();
  };

  const isEditable = Boolean(isViewMode || isSheetConnected);

  const renderSelectedSection = () => {
    switch (selectedSection) {
      case SECTION_TYPES.HEADER:
        return (
          <div className={styles.leftComponent}>
            <Header
              dynamicOptions={HeaderTypes}
              handleCategorySelect={handleCategorySelect}
              templateId={templateId}
              sequence={sectionNum}
              logo={tenantData?.account_logo?.uploadLogo}
              onSectionSave={handleSectionUpdate}
              onClose={handleCloseSection}
              initialData={editingSection}
            />
          </div>
        );
      case SECTION_TYPES.HIGHLIGHT_BANNER:
        return (
          <HighlightBanner
            dynamicFields={dynamicField}
            onSectionSave={handleSectionUpdate}
            onClose={handleCloseSection}
            templateId={templateId}
            sequence={sectionNum}
            initialData={editingSection}
          />
        );
      case SECTION_TYPES.RIGHT_TEXT_LEFT_IMAGE:
        return (
          <div className={styles.leftComponent}>
            <TextImage
              dynamicImageOptions={ImageDropdownTypes}
              dynamicFields={dynamicField}
              isRightText={true}
              onSectionSave={handleSectionUpdate}
              onClose={handleCloseSection}
              templateId={templateId}
              sequence={sectionNum}
              initialData={editingSection}
              typeIdentifier="rightTextLeftImage"
            />
          </div>
        );
      case SECTION_TYPES.LEFT_TEXT_RIGHT_IMAGE:
        return (
          <div className={styles.leftComponent}>
            <TextImage
              dynamicImageOptions={ImageDropdownTypes}
              dynamicFields={dynamicField}
              isRightText={false}
              onSectionSave={handleSectionUpdate}
              onClose={handleCloseSection}
              templateId={templateId}
              sequence={sectionNum}
              initialData={editingSection}
              typeIdentifier="leftTextRightImage"
            />
          </div>
        );
      case SECTION_TYPES.FOOTER:
        return (
          <div className={styles.leftComponent}>
            <Footer
              onSectionSave={handleSectionUpdate}
              onClose={handleCloseSection}
              templateId={templateId}
              sequence={sectionNum}
              initialData={editingSection}
            />
          </div>
        );

      case SECTION_TYPES.HIGHLIGHT_BANNER_2:
        return (
          <HighlightBanner2
            dynamicFields={dynamicField}
            dynamicURL={dynamicURL}
            onSectionSave={handleSectionUpdate}
            onClose={handleCloseSection}
            templateId={templateId}
            sequence={sectionNum}
            initialData={editingSection}
          />
        );
      default:
        return null;
    }
  };

  if (loading || sheetsLoading || tenantLoading || sectionLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error || sectionError) {
    return (
      <div className={styles.error}>Error loading data. Please try again.</div>
    );
  }

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
                <HvoSectionCardContainer
                  elementsList={elementsList}
                  onSectionUpdate={handleSectionUpdate}
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
