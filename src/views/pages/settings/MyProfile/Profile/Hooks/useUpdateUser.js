import { useState } from 'react';
import axios from 'axios';
import { users } from 'src/config/APIConfig';

const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async ({ firstName, lastName, phoneNo, imageData, originalProfileImage }) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      
      // Append all form fields, using existing data if not changed
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone_no', phoneNo);

      // Handle image upload
      if (imageData && imageData.startsWith('data:image')) {
        // New image was selected - convert base64 to file
        const response = await fetch(imageData);
        const blob = await response.blob();
        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        formData.append('file', file);
      } else if (originalProfileImage) {
        // No new image - use existing image
        try {
          const response = await fetch(originalProfileImage);
          const blob = await response.blob();
          const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
          formData.append('file', file);
        } catch (err) {
          console.error('Error processing original image:', err);
          // If we can't process the original image, we'll proceed without it
        }
      }

      const response = await axios.patch(`${users}/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`,

        },
      });

      setSuccess(true);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to update user';
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