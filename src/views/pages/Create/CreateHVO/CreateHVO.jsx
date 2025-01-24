import React, { useEffect, useState } from "react";
import SectionArea from "../CreateVideo/SectionArea/SectionArea";
import HVOCategoryForm from "./HVOCategoryForm/HVOCategoryForm";
import useGetSheetData from "../Hooks/useGetSheetData";

const CreateHVO = () => {
  const {
    data: sheetData,
    loading: isSheetLoading,
    error: errorLoadingSheets,
  } = useGetSheetData();

  const templateCategories = [
    { label: "STATIC URL", value: "static_url" },
    { label: "DYNAMIC URL", value: "dynamic_url" },
    { label: "UPLOAD IMAGE", value: "image" },
    { label: "VIDEO CLIPS", value: "video" },
  ];
  console.log("-----", sheetData);
  return <div>ABCD</div>;
};

export default CreateHVO;
