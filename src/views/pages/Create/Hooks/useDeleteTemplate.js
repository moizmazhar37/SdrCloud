import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useDeleteTemplate = (refetch) => {
  const [loading, setLoading] = useState(false);

  const deleteTemplate = async (id) => {
    setLoading(true);
    try {
      const response = await axios({
        url: `${ApiConfig.deleteTemplate}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response?.status === 200) {
        toast.success("Template Deleted Successfully.");
        if (refetch) {
          refetch();
        }
      }
    } catch (error) {
      toast.error("Failed to delete the template");
    } finally {
      setLoading(false);
    }
  };

  return { deleteTemplate, loading };
};

export default useDeleteTemplate;
