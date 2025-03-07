import { useState } from 'react';
import axios from 'axios';
import ApiConfig from 'src/config/APIConfig';
import { toast } from "react-toastify";

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
      const formDataPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataPayload.append(key, value);
      });

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
        data: formDataPayload, // Sending the FormData object
      });

      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Error creating account.');
      console.error('Error creating account:', error);
    }
  };

  return { formData, handleInputChange, handleFileChange, handleSubmit };
};

export default useAccountForm;
