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
      // Retrieve token from local storage
      const token = localStorage.getItem("token");

      // Set headers with authorization token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Include the user ID in the payload as subadmin_id
      const payloadWithUserId = {
        ...updatedData,
        subadmin_id: userId,
      };

      const response = await axios.patch(
        `${admin}/edit-subadmin/${userId}`,
        payloadWithUserId,
        { headers }
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
