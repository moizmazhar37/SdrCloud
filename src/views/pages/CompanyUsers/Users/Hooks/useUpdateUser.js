import { useState } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      // Prepare data object conditionally
      const updatedData = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        linkedinUrl: userData.linkedinUrl,
        meetLink: userData.meetLink,
        phoneNo: userData.phoneNo,
        title: userData.title,
        permissions: userData.permissions,
      };

      if (
        userData.tokens !== undefined &&
        userData.tokens !== null &&
        userData.tokens !== ""
      ) {
        updatedData.tokens = parseInt(userData.tokens) || 0;
      }

      const response = await axios.patch(
        `${ApiConfig.CreateUser}/${userData.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "Error updating user!";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

export default useUpdateUser;
