import { useState } from 'react';
import axios from 'axios';
import ApiConfig from 'src/config/APIConfig';
import { toast } from "react-toastify";

function toSnakeCase(obj) {
  const snakeObj = {};
  Object.keys(obj).forEach((key) => {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    snakeObj[snakeKey] = obj[key];
  });
  return snakeObj;
}

const useAccountForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    userName: '',
    accountPhoneNo: '',
    bookDemoButton: '',
    primaryHex: '',
    primaryRgb: '',
    redirectLinks: '',
    secondaryHex: '',
    secondaryRgb: '',
    contractedDate: '',
    contractTerm: '',
    packageName: '',
    mediaCredits: '',
    activeMediaLimits: '',
    contractedUsers: '',
    customerType: '',
    contractEndDate: '',
    logo: null,
    contractPdf: null,
    hvoPrice: null,
    videoPrice: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      const snakeCaseData = toSnakeCase({
        ...formData,
      });

      for (const key in snakeCaseData) {
        if (snakeCaseData[key]) {
          formDataToSend.append(key, snakeCaseData[key]);
        }
      }

      // await axios.post(ApiConfig.createNewAccount, formDataPayload, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     'Content-Type': 'multipart/form-data'
      //   },
      // });

      const response = await axios({
        method: "POST",
        url: ApiConfig.createNewAccount,  // API endpoint for saving hero section data
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: formDataToSend, // Sending the FormData object
      });

      toast.success('Account created successfully.');
    } catch (error) {
      toast.error(error?.response?.data?.detail || 'Error creating account!');
      console.error('Error creating account:', error);
    }
  };

  return { formData, handleInputChange, handleFileChange, handleSubmit };
};

export default useAccountForm;
