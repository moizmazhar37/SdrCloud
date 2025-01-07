import { useState } from 'react';
import axios from 'axios';
import ApiConfig from 'src/config/APIConfig';
import { toast } from 'react-toastify';

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${ApiConfig.CreateUser}/${userData.id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success("User updated successfully!");
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "Error updating user!";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

export default useUpdateUser;