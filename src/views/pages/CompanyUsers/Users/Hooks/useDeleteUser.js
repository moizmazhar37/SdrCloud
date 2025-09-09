import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ApiConfig from 'src/config/APIConfig';

const useDeleteUser = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (userId, onSuccess) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios({
        method: "DELETE",
        url: `${ApiConfig.getAllUsers}/${userId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      
      if (res?.status === 200) {
        toast.success("User Deleted Successfully");
        onSuccess?.();
      }
    } catch (err) {
      console.log(err, "error");
      setError(err);
      toast.error("Error:",err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUser,
    isLoading,
    error
  };
};

export default useDeleteUser;