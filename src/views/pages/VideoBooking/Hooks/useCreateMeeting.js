import { useState } from "react";
import { tenantMeeting } from "src/config/APIConfig";

const useCreateMeeting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMeeting = async (meetingData) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${tenantMeeting}/create-meeting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tenant_id: meetingData.tenant_id,
          email: meetingData.email,
          start_time_utc: meetingData.start_time_utc,
          summary: meetingData.name,
          description: "Scheduled via platform"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: response.statusText }));
        throw new Error(errorData.detail || `Error: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message || "Failed to create meeting");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createMeeting, loading, error };
};

export default useCreateMeeting;