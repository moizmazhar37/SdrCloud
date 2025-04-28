import React, { useEffect, useState, useCallback } from "react";
import SectionArea from "../CreateVideo/SectionArea/SectionArea";
import useGetSheetData from "../Hooks/useGetSheetData";
import useGetSheets from "../Hooks/useGetSheets";
import useHvoSections from "./Hooks/useGetHvoSections";
import useCompanyTenant from "../../settings/Company/Hooks/useCompanyTenant";
import useCreateHVO from "./Hooks/useCreateHVO";
import styles from "./CreateHVO.module.scss";
import HVOCategoryForm from "./HVOCategoryForm/HVOCategoryForm";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import HvoSectionCardContainer from "./HvoSectionCard/HvoSectionCardContainer";
import ConfirmationModal from "src/Common/ConfirmationModal/ConfirmationModal";
import VideoUpload from "./Sections/VideoSection/VideoSection";
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
import HeroSection from "./Sections/Hero/Hero";
import { toast } from "react-hot-toast";

const SECTION_TYPES = {
  RIGHT_TEXT_LEFT_IMAGE: "Right Text Left Image",
  LEFT_TEXT_RIGHT_IMAGE: "Left Text Right Image",
  HEADER: "Header",
  HIGHLIGHT_BANNER: "Highlight Banner",
  HIGHLIGHT_BANNER_2: "Highlight Banner 2",
  FOOTER: "Footer",
  HERO: "Hero",
  VIDEO: "HVO Video",
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
  const [dataFetchTrigger, setDataFetchTrigger] = useState(0);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);



  const { data: sheetData, loading: sheetsLoading } = useGetSheets("HVO");
  // Now we'll refetch when dataFetchTrigger changes
  const { data, loading, error, refetch } = useGetSheetData(
    templateId,
    dataFetchTrigger
  );
  const { data: tenantData, loading: tenantLoading } = useCompanyTenant();
  const {
    data: sectionData,
    loading: sectionLoading,
    error: sectionError,
    refetch: refetchSections,
  } = useHvoSections(templateId, sectionUpdateTrigger);

  const { handleCreateVideo, isLoading: isCreatingHVO } = useCreateHVO();

  // Check for templateId in URL on initial load
  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("templateId");
    if (id) {
      setTemplateId(id);
      setIsViewMode(true);
    }
  }, []);

  // Update URL when templateId changes
  useEffect(() => {
    if (templateId) {
      const newUrl = `/createtemplate&HVO?templateId=${templateId}`;
      if (isSheetConnected) window.history.pushState({}, "", newUrl);
    }
  }, [templateId, isSheetConnected]);

  // Explicitly trigger data fetch when sheet is connected and template ID is set
  useEffect(() => {
    if (isSheetConnected && templateId) {
      setDataFetchTrigger((prev) => prev + 1);
      refetch && refetch();
      refetchSections && refetchSections();
    }
  }, [isSheetConnected, templateId, refetch, refetchSections]);

  const handleSectionUpdate = useCallback(() => {
    setSectionUpdateTrigger((prev) => !prev);
  }, []);

  const elementsList = Array.isArray(sectionData?.elementsList)
    ? sectionData.elementsList
    : [];
  console.log("Element List in Create ==", elementsList);

  const dynamicField = extractKeywordList(data, HighlightBannerTypes);
  const dynamicURL = extractKeywordList(data, URLTypes);
  const HeaderTypes = extractHvoCategories(data, ["Logo"]);
  const ImageDropdownTypes = extractHvoCategories(data, [
    "Screenshot from URL",
    "Image URL",
  ]);
  const dynamicVideos = extractKeywordList(data, ["Video URL"]);

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
    // This will trigger the useEffect that explicitly calls refetch
  };

  const handleEdit = (section) => {
    console.log("Selected==,", section.section_name);
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

  const confirmAndCreateHVO = (templateId) => {
    handleCreateVideo(templateId);
  };

  const handleCreateHVO = () => {
    if (templateId) {
      setIsConfirmationOpen(true);
    } else {
      toast.error("Please create a template first");
    }
  };
  
  

  const isEditable = Boolean(isViewMode || isSheetConnected);

  const renderSelectedSection = () => {
    switch (selectedSection) {
      case "Header":
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
      case "Highlight Banner":
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
      case "Right Text Left Image":
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
            />
          </div>
        );
      case "Left Text Right Image":
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
            />
          </div>
        );
      case "Footer":
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

      case SECTION_TYPES.HERO:
        return (
          <div className={styles.leftComponent}>
            <HeroSection
              dynamicFields={dynamicField}
              dynamicURL={dynamicURL}
              dynamicImage={ImageDropdownTypes}
              onSectionSave={handleSectionUpdate}
              onClose={handleCloseSection}
              templateId={templateId}
              sequence={sectionNum}
              initialData={editingSection}
            />
          </div>
        );
      case SECTION_TYPES.VIDEO:
        return (
          <div className={styles.leftComponent}>
            <VideoUpload
              dynamicVideos={dynamicVideos}
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
                  templateId={templateId}
                />
              </div>
            </div>
          )}
          <button
            className={styles.CreatButton}
            onClick={handleCreateHVO}
            disabled={!templateId || isCreatingHVO}
          >
            {isCreatingHVO ? "Creating..." : "Create HVO"}
          </button>
        </div>
        <div className={styles.rightComponent}>
          <SectionArea
            initialOptions={hvoInitialOptions}
            onSectionTypeChange={handleSectionTypeChange}
            editable={isEditable}
            templateId={templateId}
            elementsList={elementsList}
            type="hvo"
          />
        </div>
      </div>
      {isConfirmationOpen && (
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          showInputField={false}

          onClose={() => setIsConfirmationOpen(false)}
          title="Confirm HVO Creation"
          confirmationText="Are you sure you want to create a HVO with this template? This also means that the emails will be sent!"
          actionButtonText="Create"
          onAction={(rowsToCreate) => {
            confirmAndCreateHVO(templateId);
            setIsConfirmationOpen(false);
          }}
          totalRecords={data?.length || 10} // You can adjust this as needed
        />
      )}
    </div>
  );
};

export default CreateHVO;
