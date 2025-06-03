// hooks/useEmailSetup.js
import { useState } from "react";

const Helpers = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(`Hi [Recipient's Name],
I came across your profile and was impressed by your expertise in [specific area]. I'm currently exploring new opportunities for [specific roles/industries] and would love to connect and discuss how my skills could align with [Company's Name/Team].
Looking forward to hearing from you!
Best regards,`);

  const [htmlContent, setHtmlContent] = useState(`<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: #f4f4f4; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { background: #333; color: white; padding: 10px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Professional Email Template</h1>
        </div>
        <div class="content">
            <p>Hi [Recipient's Name],</p>
            <p>I came across your profile and was impressed by your expertise in <strong>[specific area]</strong>. I'm currently exploring new opportunities for [specific roles/industries] and would love to connect and discuss how my skills could align with [Company's Name/Team].</p>
            <p>Looking forward to hearing from you!</p>
            <p>Best regards,<br>[Your Name]</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Professional Communications</p>
        </div>
    </div>
</body>
</html>`);

  const [useHtmlTemplate, setUseHtmlTemplate] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [attachedImages, setAttachedImages] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const fileData = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        file,
      };
      setAttachedFiles((prev) => [...prev, fileData]);
    });
    e.target.value = "";
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = {
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file,
            preview: event.target.result,
          };
          setAttachedImages((prev) => [...prev, imageData]);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = "";
  };

  const removeFile = (id) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const removeImage = (id) => {
    setAttachedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return {
    subject,
    setSubject,
    message,
    setMessage,
    htmlContent,
    setHtmlContent,
    useHtmlTemplate,
    setUseHtmlTemplate,
    attachedFiles,
    handleFileUpload,
    removeFile,
    attachedImages,
    handleImageUpload,
    removeImage,
    formatFileSize,
  };
};

export default Helpers;
