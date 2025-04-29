import { useState } from 'react';
import ApiConfig from 'src/config/APIConfig';
import axios from 'axios';

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const formattedData = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        linkedinUrl: userData.linkedinUrl,
        meetLink: userData.meetingLink,
        phoneNo: userData.phone,
        title: userData.title,
        tokens: parseInt(userData.tokens) || 0
      };

      const response = await axios.post(ApiConfig.CreateUser, formattedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while creating the user');
      setLoading(false);
      throw err;
    }
  };

  return { createUser, loading, error };
};