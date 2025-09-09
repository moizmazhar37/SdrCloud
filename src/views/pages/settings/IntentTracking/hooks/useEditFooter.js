import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useEditFooter = (refetch) => {
  const [loading, setLoading] = useState(false);

  const editFooter = async (id, payload) => {
    setLoading(true);
    try {
      const response = await axios({
        url: `${ApiConfig.footerLink}/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: payload,
      });

      if (response?.status === 200) {
        toast.success("Footer Link Updated Successfully");
        if (refetch) {
          refetch();
        }
      }
    } catch (error) {
      toast.error("Failed to update the footer link");
    } finally {
      setLoading(false);
    }
  };

  return { editFooter, loading };
};

export default useEditFooter;
