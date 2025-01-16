import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useGetSheets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSheets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        url: `${ApiConfig.connectedSheetVideo}?isSheetConnected=false&sheetType=VIDEO`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response?.status === 200) {
        setData(response.data);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      setError(
        err.response?.data?.msg || err.message || "Something went wrong"
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSheets();
  }, []);

  return { data, loading, error, refetch: fetchSheets };
};

export default useGetSheets;
