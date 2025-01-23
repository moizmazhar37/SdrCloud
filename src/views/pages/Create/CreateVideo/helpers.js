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
