import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/config/APIConfig";

const useViewAsUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTemporaryToken = async (userId) => {
    setLoading(true);
    setError(null);

    try {
    // console.log("User ID:", userId);
      const response = await axios.post(ApiConfig.viewAsUser, { user_id: userId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Master’s token
        },
      });

      if (response.status === 200) {
        return response.data.token; // Return Slave’s token
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to switch user. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getTemporaryToken, loading, error };
};

export default useViewAsUser;
