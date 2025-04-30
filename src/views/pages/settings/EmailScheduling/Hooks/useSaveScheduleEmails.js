import { useState } from "react";
import axios from "axios";
import { emailTemplate } from "src/config/APIConfig";

const useSaveScheduleEmails = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const saveSchedule = async (scheduleData) => {
    const token = localStorage.getItem("token");
    const url = `${emailTemplate}/set-schedule`;

    setSaving(true);
    setError(null);

    try {
      const response = await axios.post(url, scheduleData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      setError(err);
      console.error("Failed to save schedule:", err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { saveSchedule, saving, error };
};

export default useSaveScheduleEmails;
