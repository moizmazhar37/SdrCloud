import { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from 'src/config/APIConfig';

const useDynamicFieldList = (templateId) => {
  const [stringList, setStringList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTemplateStrings = async () => {
    if (!templateId) {
      setStringList([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: 'GET', 
        url: `${url}/templates/dynamic-fields/${templateId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      
      if (Array.isArray(data)) {
        setStringList(data);
      } else {
        setStringList([]);
        setError('Invalid response format: expected an array');
      }
    } catch (err) {
      console.error('Error fetching template strings:', err);
      
      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        setError(`Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`);
      } else if (err.request) {
        // Request was made but no response received
        setError('Network error: Unable to reach the server');
      } else {
        // Something else happened
        setError(`Error: ${err.message}`);
      }
      
      setStringList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplateStrings();
  }, [templateId]);

  // Return the state and a refetch function
  return {
    stringList,
    loading,
    error,
    refetch: fetchTemplateStrings
  };
};

export default useDynamicFieldList;