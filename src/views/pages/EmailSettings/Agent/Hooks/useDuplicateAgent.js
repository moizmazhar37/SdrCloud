import { useState } from "react";
import { url } from "src/config/APIConfig";
import { toast } from "react-toastify";

const useDuplicateAgent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const duplicateAgent = async (agentId, newAgentName, newEmail) => {
    setLoading(true);
    setError(null);
    setData(null);

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${url}/campaign/duplicate-agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          existing_agent_id: agentId,
          name: newAgentName,
          email: newEmail,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || errorData.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setData(result);
      toast.success("Agent duplicated successfully!");
      return result;
    } catch (err) {
      const message = err.message || "An error occurred while duplicating agent.";
      toast.error(message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    duplicateAgent,
  };
};

export default useDuplicateAgent;
