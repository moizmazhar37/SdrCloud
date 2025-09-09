import { useState } from "react";
import axios from "axios";
import { tenantMeeting } from "src/config/APIConfig";

const useTriggerCalendlyMeeting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const triggerMeeting = async (tenantId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${tenantMeeting}/calendly/trigger/${tenantId}`
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error("Error triggering Calendly meeting:", err);
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { triggerMeeting, loading, error };
};

export default useTriggerCalendlyMeeting;
