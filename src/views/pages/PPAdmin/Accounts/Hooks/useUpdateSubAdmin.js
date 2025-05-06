import axios from "axios";
import { useState } from "react";
import { admin } from "src/config/APIConfig";

const useUpdateSubAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSubAdmin = async (userId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(
        `${admin}/edit-subadmin/${userId}`,
        updatedData
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateSubAdmin, loading, error };
};

export default useUpdateSubAdmin;
