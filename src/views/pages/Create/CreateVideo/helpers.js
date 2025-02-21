export const extractCategories = (data, type) => {
  if (!data || !Array.isArray(data)) {
    console.warn("Data is null or not an array");
    return [];
  }
  return data
    .filter((item) => item.dataType === type)
    .map((item) => ({ label: item.value, value: item.value }));
};

export const navigationItems = [
  { text: "Template", route: "/CreateTemplate" },
  { text: "New Video Template", route: "/createtemplate&Video" },
];

export const initialOptions = [
  { label: "STATIC URL", value: "static_url" },
  { label: "DYNAMIC URL", value: "dynamic_url" },
  { label: "UPLOAD IMAGE", value: "image" },
  { label: "VIDEO CLIPS", value: "video" },
];

export const hvoInitialOptions = [
  { label: "Header", value: "Header" },
  { label: "Hero", value: "Hero" },
  { label: "Highlight Banner", value: "Highlight Banner" },
  { label: "Right Text Left Image", value: "Right Text Left Image" },
  { label: "Highlight Banner 2", value: "Highlight Banner 2" },
  { label: "Left Text Right Image", value: "Left Text Right Image" },
  { label: "Footer", value: "Footer" },
  { label: "Video", value: "HVO Video" },
];

export const extractHvoCategories = (data, types) => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  if (!Array.isArray(types) || types.length === 0) {
    return [];
  }

  return data
    .filter((item) => types.includes(item.dataType))
    .map((item) => ({ label: item.value, value: item.value }));
};
export const HighlightBannerTypes = [
  "Text",
  "First name",
  "Last name",
  "Customer organization",
];

export const URLTypes = ["URL"];

export const extractKeywordList = (data, types) => {
  if (!data || !Array.isArray(data)) {
    console.warn("Data is null or not an array");
    return [];
  }

  if (!Array.isArray(types) || types.length === 0) {
    console.warn("Types should be a non-empty array");
    return [];
  }

  return data
    .filter((item) => types.includes(item.dataType))
    .map((item) => item.value);
};

export const getAudioCategories = (data) => {
  const validDataTypes = [
    "First name (Required)",
    "Last name",
    "Customer organization",
    "Text",
  ];

  if (!data || !Array.isArray(data)) {
    return [];
  }

  const filteredValues = [];
  data.forEach((item) => {
    if (validDataTypes.includes(item.dataType)) {
      filteredValues.push(item.value);
    }
  });

  return filteredValues;
};

//------------------------------HVO---------------------------------------------//

export const hvoNavigationItems = [
  { text: "Template", route: "/CreateTemplate" },
  { text: "New HVO Template", route: "/createtemplate&Video" },
];
