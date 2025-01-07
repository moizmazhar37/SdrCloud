import { toast } from 'react-toastify';

export const resetForm = (setFormData, setErrors, setShowPassword) => {
  setFormData({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    title: "",
    linkedinUrl: "",
    meetingLink: "",
    tokens: ""
  });
  setErrors({});
  setShowPassword(false);
};

export const validateField = (name, value) => {
  switch (name) {
    case "firstName":
      if (!value || value.trim() === "") {
        return "First name is required.";
      }
      if (!/^[^\d\W]/.test(value) || value.length < 2 || value.length > 50 || !/^[a-zA-Z0-9\s-_]+$/.test(value)) {
        return "First name must start with a letter, be between 2 and 50 characters, and contain only alphanumeric or special characters.";
      }
      break;
    case "lastName":
      if (!value || value.trim() === "") {
        return "Last name is required.";
      }
      if (!/^[^\d\W]/.test(value) || value.length < 2 || value.length > 50 || !/^[a-zA-Z0-9\s-_]+$/.test(value)) {
        return "Last name must start with a letter, be between 2 and 50 characters, and contain only alphanumeric or special characters.";
      }
      break;
    case "email":
      if (!value || value.trim() === "") {
        return "Email is required.";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "A valid email address is required (e.g., user@example.com).";
      }
      break;
    case "phone":
      if (!value || value.trim() === "") {
        return "Phone number is required.";
      }
      if (value.length < 10) {
        return "Please enter a valid phone number.";
      }
      break;
    case "linkedinUrl":
      if (value && !value.startsWith("https://www.linkedin.com/")) {
        return "Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username).";
      }
      break;
    case "meetingLink":
      if (value && !value.startsWith("http")) {
        return "Please enter a valid meeting link URL.";
      }
      break;
    case "password":
      if (!value || value.trim() === "") {
        return "Password is required.";
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(value)) {
        return "Password must be between 8 and 20 characters, including a mix of uppercase, lowercase, numbers, and special characters.";
      }
      break;
    case "title":
      if (!value || value.trim() === "") {
        return "Title is required.";
      }
      break;
    case "tokens":
      if (!value || value.trim() === "") {
        return "Tokens are required.";
      }
      if (isNaN(value) || parseInt(value) < 0) {
        return "Please enter a valid number of tokens.";
      }
      break;
    default:
      return "";
  }
  return "";
};

export const handleChange = (e, setFormData, setErrors) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  const error = validateField(name, value);
  setErrors((prev) => ({ ...prev, [name]: error }));
};

export const handleBlur = (e, setErrors) => {
  const { name, value } = e.target;
  const error = validateField(name, value);
  setErrors((prev) => ({ ...prev, [name]: error }));
};

export const handleSubmit = async (formData, validateField, setErrors, createUser, toast, resetForm, onSuccess) => {
  const validationErrors = {};
  Object.keys(formData).forEach(field => {
    const error = validateField(field, formData[field]);
    if (error) validationErrors[field] = error;
  });

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    await createUser(formData);
    toast.success('User created successfully');
    resetForm();
    if (onSuccess) {
      onSuccess();
    }
  } catch (err) {
    toast.error(err.response?.data?.detail || 'Failed to create user');
    console.error('Failed to create user:', err);
  }
};
