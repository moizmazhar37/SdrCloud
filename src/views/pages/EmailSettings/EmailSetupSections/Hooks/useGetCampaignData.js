import { useEffect, useState } from "react";
import axios from "axios";
import { campaignSettings } from "src/config/APIConfig";

const useGetCampaignData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      setLoading(true);
      setError(null);

      try {
        const templateId = localStorage.getItem("selectedTemplateId");
        const token = localStorage.getItem("token");

        const response = await axios.get(`${campaignSettings}/${templateId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, []);

  return { loading, error, data };
};

export default useGetCampaignData;
