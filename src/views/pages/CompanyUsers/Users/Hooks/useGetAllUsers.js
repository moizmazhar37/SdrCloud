import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // Add a refresh trigger state
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Create a memoized fetchUsers function that we can use both in useEffect and for manual refetching
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getAllUsers,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res?.status === 200) {
        setData(res?.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a refetch function that will trigger a refresh
  const refetch = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // Update useEffect to depend on the refresh trigger
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, refreshTrigger]);

  return { loading, error, data, refetch };
};

export default useGetAllUsers;