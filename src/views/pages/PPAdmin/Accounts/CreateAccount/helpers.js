export const createFileInput = (accept, onFileSelect) => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = accept;
  fileInput.onchange = onFileSelect;
  fileInput.click();
};

export const handleLogoUpload = (handleFileChange, setLogoFileName) => {
  createFileInput("image/*", (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileChange(e, "logo");
      setLogoFileName(file.name);
    }
  });
};

export const handleContractUpload = (handleFileChange, setContractFileName) => {
  createFileInput(".pdf", (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileChange(e, "contractPdf");
      setContractFileName(file.name);
    }
  });
};

export const calculateContractEndDate = (startDate, contractTerm) => {
  if (!startDate || !contractTerm) return "";

  const start = new Date(startDate);
  let endDate = new Date(start);

  const termMap = {
    Trial: () => endDate.setDate(start.getDate() + 7),
    "3 Months": () => endDate.setMonth(start.getMonth() + 3),
    "6 Months": () => endDate.setMonth(start.getMonth() + 6),
    "1 Year": () => endDate.setFullYear(start.getFullYear() + 1),
    "2 Years": () => endDate.setFullYear(start.getFullYear() + 2),
    "3 Years": () => endDate.setFullYear(start.getFullYear() + 3),
    "4 Years": () => endDate.setFullYear(start.getFullYear() + 4),
  };

  if (termMap[contractTerm]) {
    termMap[contractTerm]();
    return endDate.toISOString().split("T")[0];
  }

  return "";
};

export const createPhoneChangeHandler =
  (handleInputChange, fieldName) => (phone) => {
    handleInputChange({ target: { name: fieldName, value: phone } });
  };

export const createColorChangeHandler =
  (handleInputChange, fieldName) => (color) => {
    handleInputChange({ target: { name: fieldName, value: color } });
  };
