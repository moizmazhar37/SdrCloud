import { useState } from "react";
import axios from "axios";
import { tenantMeeting } from "src/config/APIConfig";
import { toast } from "react-toastify";

export const useSetAvailability = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setAvailability = async ({ weekday, time_slots_utc }) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await axios.post(
        `${tenantMeeting}/set-availability/`,
        {
          weekday,
          time_slots_utc: time_slots_utc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Availability set successfully!");
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to set availability.";
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { setAvailability, loading, error };
};
