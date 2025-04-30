import { useState } from "react";
import { tenantMeeting } from "src/config/APIConfig";

const useUpdateMeetingStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateStatus = async (meeting_id, status) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token");

    try {
      // Note: The API expects status in the query parameter, not in the body
      const response = await fetch(
        `${tenantMeeting}/meetings/${meeting_id}?status=${encodeURIComponent(
          status
        )}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // No body needed as we're passing status in the query parameter
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setSuccess(true);
      return true; // Return true on success to indicate operation completed successfully
    } catch (err) {
      setError(err.message || "Failed to update meeting status");
      return false; // Return false on failure
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error, success };
};

export default useUpdateMeetingStatus;
