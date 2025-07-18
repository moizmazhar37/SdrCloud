import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { campaign } from "src/config/APIConfig";

const useSaveConfigurations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const { id: agentIdFromUrl } = useParams();

  const saveConfigurations = async (payload) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const token = localStorage.getItem("token");
      const updatedPayload = payload.map((item) => ({
        ...item,
        agent_id: agentIdFromUrl,
      }));

      const res = await axios.post(
        `${campaign}/trigger-conditions`,
        updatedPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveConfigurations,
    loading,
    error,
    response,
    agentId: agentIdFromUrl,
  };
};

export default useSaveConfigurations;
