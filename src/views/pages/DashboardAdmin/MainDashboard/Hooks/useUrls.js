import { useState, useEffect } from "react";
import ApiConfig from "src/config/APIConfig";

const useUrls = () => {
  const [urls, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setError(false);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(`${ApiConfig.getUrls}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  return { urls, loadingUrls:loading, errorInUrls:error };
};

export default useUrls;
