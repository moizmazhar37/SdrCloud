import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ApiConfig from "../../../../config/APIConfig";

export const useGoogleSheetsData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        url: `${ApiConfig.googleSheet}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, fetchData };
};

export const useDeleteGoogleSheet = (refreshCallback) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteGoogleSheet = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${ApiConfig.googleSheet}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response?.status === 200) {
        toast.success("Sheet Deleted Successfully.");
        if (refreshCallback) {
          refreshCallback(); // Refresh the data
        }
      } else {
        toast.error("Failed to delete the sheet. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the sheet.");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteGoogleSheet, isLoading };
};
