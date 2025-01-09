import { useState } from 'react';
import axios from 'axios';
import { users } from 'src/config/APIConfig';

const useUpdateUser = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const convertImageToFile = async (imageData) => {
    try {
      // For data URLs (new uploads)
      if (imageData.startsWith('data:image')) {
        const response = await fetch(imageData);
        const blob = await response.blob();
        return new File([blob], 'profile.jpg', { type: 'image/jpeg' });
      } 
      // For URLs (existing profile picture)
      else {
        let imageUrl = imageData;
        
        // If it's a relative URL, make it absolute
        if (imageData.startsWith('/')) {
          imageUrl = `${window.location.origin}${imageData}`;
        }

        // Add authorization header for fetching the image
        const response = await fetch(imageUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const blob = await response.blob();
        return new File([blob], 'profile.jpg', { type: blob.type || 'image/jpeg' });
      }
    } catch (err) {
      console.error('Image conversion error:', err);
      // Instead of throwing error, return the original URL
      return imageData;
    }
  };

  const updateUser = async ({ firstName, lastName, phoneNo, imageData }) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!imageData) {
        throw new Error('Profile image is required');
      }

      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone_no', phoneNo);

      // If imageData is a URL that starts with http or https, append it directly
      if (typeof imageData === 'string' && (imageData.startsWith('http://') || imageData.startsWith('https://'))) {
        formData.append('profile_picture_url', imageData);
      } else {
        // Try to convert to file, but if it fails, use the original URL
        const processedImage = await convertImageToFile(imageData);
        
        if (processedImage instanceof File) {
          formData.append('file', processedImage);
        } else {
          formData.append('profile_picture_url', imageData);
        }
      }

      const response = await axios.patch(`${users}/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to update user';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUser,
    isLoading,
    error,
    success,
  };
};

export default useUpdateUser;