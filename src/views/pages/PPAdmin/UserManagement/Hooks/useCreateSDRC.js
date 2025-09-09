import { useState } from "react";
import axios from "axios";
import { admin } from "src/config/APIConfig";

const useCreateSdrcAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createAdmin = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_no: formData.phone,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${admin}/sdrc-admin`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { createAdmin, loading, error, success };
};

export default useCreateSdrcAdmin;
