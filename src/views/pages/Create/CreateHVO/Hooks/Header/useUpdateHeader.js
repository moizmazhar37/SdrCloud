import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useUpdateHeader = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateHeader = async (
    sectionId,
    { sequence, headerLogo, companyLogo }
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: "PATCH",
        url: `${ApiConfig.headerSection}/${sectionId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: {
          sequence,
          headerLogo: headerLogo,
          companyLogo: companyLogo,
        },
      });

      if (response.status === 200) {
        toast.success("Header section updated successfully.");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error("Failed to update header section");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update header section";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateHeader, loading, error };
};

export default useUpdateHeader;
