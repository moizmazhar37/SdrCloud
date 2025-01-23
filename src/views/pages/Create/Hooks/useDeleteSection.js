import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useDeleteSection = (reloadDataCallback) => {
  const [loading, setLoading] = useState(false);

  const deleteSection = async (deleteId) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "DELETE",
        url: `${ApiConfig.deleteElement}/${deleteId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res?.status === 200) {
        toast.success("Element Deleted Successfully");
        if (reloadDataCallback) {
          reloadDataCallback();
        }
      }
    } catch (error) {
      toast.error("Failed to delete section");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteSection, loading };
};

export default useDeleteSection;
