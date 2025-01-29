import { toast } from "react-toastify";

export const initializeEditData = (editData, setStateFunctions) => {
  const {
    setImageURL,
    setImagePreview,
    setSelectedCategory,
    setDuration,
    setScroll,
    setAudioDescription,
    setCurrentEditData,
  } = setStateFunctions;

  if (editData) {
    if (editData.value) {
      setImageURL(editData.value);
      setImagePreview(editData.value);
      setSelectedCategory(editData.section_name);
    } else {
      setImagePreview(editData.previewContent);
    }

    setDuration(editData.duration || "");
    setScroll(editData.scroll || false);
    setAudioDescription(editData.audioDescription || "");
    setCurrentEditData(editData);
  }
};

export const resetForm = (setStateFunctions) => {
  const {
    setImageFile,
    setImageURL,
    setImagePreview,
    setAudioFile,
    setDuration,
    setSelectedCategory,
    setAudioDescription,
    setScroll,
    setCurrentEditData,
    setDropdownKey,
  } = setStateFunctions;

  setImageFile(null);
  setImageURL("");
  setImagePreview("");
  setAudioFile(null);
  setDuration("");
  setSelectedCategory(null);
  setAudioDescription("");
  setScroll(null);
  setCurrentEditData(null);
  setDropdownKey((prev) => prev + 1);
};

export const handleImageUpload = (
  e,
  setImageFile,
  setImagePreview,
  setImageURL,
  setSelectedCategory,
  setDropdownKey
) => {
  const file = e.target.files[0];
  if (file) {
    setImageFile(file);
    setImageURL("");
    setImagePreview(URL.createObjectURL(file));
    setSelectedCategory(null);
    setDropdownKey((prev) => prev + 1);
  }
};

export const handleAudioUpload = (e, setAudioFile) => {
  const file = e.target.files[0];
  if (file) {
    setAudioFile(file);
  }
};

export const handleSave = async (
  isFormValid,
  templateId,
  sectionNumber,
  imageFile,
  imageURL,
  selectedCategory,
  duration,
  audioFile,
  scroll,
  audioDescription,
  currentEditData,
  createVideoSection,
  updateVideoSection,
  onSaveSuccess,
  onClose
) => {
  if (!isFormValid()) return;

  const videoSectionData = {
    hvoTemplateId: templateId,
    sectionName: selectedCategory || "IMAGE URL",
    sectionNumber: 3,
    sequence: sectionNumber,
    duration: duration,
    audioEmbedded: !!audioFile,
    scroll: scroll,
    audioDescription: audioDescription,
    firstRowValue: null,
    isDynamic: !!selectedCategory,
    file: imageFile,
    value: selectedCategory ? imageURL : null,
    audio: audioFile,
  };

  if (currentEditData) {
    videoSectionData.id = currentEditData.id;
  }

  try {
    let response;
    if (currentEditData) {
      response = await updateVideoSection(currentEditData.id, videoSectionData);
    } else {
      response = await createVideoSection(videoSectionData);
    }

    if (response) {
      onSaveSuccess();
      toast.success(
        `Image section ${currentEditData ? "updated" : "saved"} successfully`
      );
      onClose();
    }
  } catch (error) {
    toast.error(
      `Failed to ${currentEditData ? "update" : "save"} image section`
    );
  }
};

export const isFormValid = (imageFile, imageURL, duration) => {
  return (
    (imageFile || imageURL.trim() !== "") && String(duration).trim() !== ""
  );
};
