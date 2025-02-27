import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { alerts } from "src/config/APIConfig";
const useMarkAlertViewed = () => {
  const [loading, setLoading] = useState(false);

  const markAlertViewed = async (alertId, token) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${alerts}/mark-alert-viewed/${alertId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );




      toast.success('Alert marked as viewed');
      return response.data; 
    } catch (error) {
      toast.error('Failed to mark alert as viewed');
      console.error('Error marking alert as viewed:', error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  return { markAlertViewed, loading };
};

export default useMarkAlertViewed;
