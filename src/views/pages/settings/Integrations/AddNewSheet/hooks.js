import { useState, useEffect } from "react";
import Axios from "axios";
import ApiConfig from "../../../../../config/APIConfig";

// Hook to fetch all users
export const useGetAllUsers = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        url: ApiConfig.getAllUserByAccountId,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response?.data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return { data, loading, error, getAllUsers };
};

// Hook to fetch Google Sheets
export const useFetchSheet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSheet = async (payload) => {
    setLoading(true);
    try {
      const response = await Axios({
        url: `${ApiConfig.fetchSheet}/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: payload,
      });
      return response?.data; // Return response data directly
    } catch (err) {
      console.error("Error fetching sheet:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchSheet, loading, error };
};
