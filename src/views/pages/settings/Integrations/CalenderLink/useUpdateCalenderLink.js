import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { tenant } from "src/config/APIConfig";

const useUpdateCalendarLink = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCalendarLink = async (meetLink) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("meetLink", meetLink);

      const response = await axios.patch(`${tenant}/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Calendar link updated successfully!");
    } catch (error) {
      setError(error.message || "An error occurred");
      toast.error("Failed to update calendar link");
    }

    setLoading(false);
  };

  return { updateCalendarLink, loading, error };
};

export default useUpdateCalendarLink;
