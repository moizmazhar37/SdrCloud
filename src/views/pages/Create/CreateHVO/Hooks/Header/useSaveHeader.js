import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useSaveHeader = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveHeader = async ({
    hvoTemplateId,
    sequence,
    headerLogo,
    companyLogo,
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.headerSection,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: {
          hvoTemplateId,
          sequence,
          headerLogo,
          companyLogo,
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Section saved successfully");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error("Failed to save header");
      }
    } catch (err) {
      setError(err.message || "An error occurred while saving the header");
      toast.error(err.message || "Failed to save header. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { saveHeader, loading, error };
};

export default useSaveHeader;
