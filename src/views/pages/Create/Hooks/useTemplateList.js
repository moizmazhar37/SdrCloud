import { useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useTemplateList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplateList = async () => {
      setLoading(true);
      setError(null); 
      try {
        const response = await axios({
          url: `${ApiConfig.getTemplateList}/`,
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
        setError(err.response?.data?.msg || err.message || "Something went wrong");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateList();
  }, []); 

  return { data, loading, error };
};

export default useTemplateList;
