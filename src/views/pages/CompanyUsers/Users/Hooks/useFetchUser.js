import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import { toast } from "react-toastify";

const useFetchUser = (userId) => {
  const [data, setData] = useState(null);
  const [loadingUserData, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${ApiConfig.CreateUser}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "Error Fetching Details!";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { 
    data, 
    loadingUserData, 
    error,
    refetch: fetchUser 
  };
};

export default useFetchUser;