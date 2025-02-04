import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { hvoelement } from "src/config/APIConfig";

const useDeleteHvoSection = (onDeleteSuccess) => {
  const [loading, setLoading] = useState(false);

  const deleteSection = async (sectionId, sectionNumber) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "DELETE",
        url: `${hvoelement}/hvo-section/${sectionId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          section_id: sectionId,
          section_number: sectionNumber,
        },
      });

      if (response?.status === 200) {
        toast.success("Section Deleted Successfully");
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      }
    } catch (error) {
      toast.error("Failed to delete section");
      console.error("Delete section error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteSection,
    loading,
  };
};

export default useDeleteHvoSection;
