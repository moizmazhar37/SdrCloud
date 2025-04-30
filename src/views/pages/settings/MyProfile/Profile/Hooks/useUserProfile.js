import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { users } from "src/config/APIConfig";

const useUserProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${users}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong on our end. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return { data, loading, error, refetch: fetchUserProfile };
};

export default useUserProfile;
