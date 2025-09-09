import { useState } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        ApiConfig.changePassword,
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message || "Password changed successfully.");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to change password.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading };
};

export default useChangePassword;
