import React, { useState, useEffect } from "react";
import ImageModal from "../ImageModal/ImageModal";
import Password from "./Password/Password";
import useUpdateUser from "./Hooks/useUpdateUser";
import styles from "./MyProfile.module.scss";

const MyProfile = ({ data, headers, edit, setEdit, onUpdateSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(data.profileImage || null);
  const [tempImage, setTempImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    phoneNo: data.phoneNo || "",
  });

  const { updateUser, isLoading, error, success } =
    useUpdateUser(onUpdateSuccess);

  useEffect(() => {
    setFormData({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      phoneNo: data.phoneNo || "",
    });
    setProfileImage(data.profileImage);
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const currentImageToUse = tempImage || profileImage;

      if (!currentImageToUse) {
        console.error("No image available");
        return;
      }

      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNo: formData.phoneNo,
        imageData: currentImageToUse,
      };

      await updateUser(updateData);

      if (tempImage) {
        setProfileImage(tempImage);
      }
      setTempImage(null);
      setEdit(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      phoneNo: data.phoneNo || "",
    });
    setTempImage(null);
    setEdit(false);
  };

  const handleUpload = () => {
    setIsModalOpen(true);
  };

  const handleImageSave = (imageData) => {
    setTempImage(imageData);
    setIsModalOpen(false);
  };

  const displayImage = edit ? tempImage || profileImage : profileImage;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{headers.title}</span>
        {!edit && (
          <button className={styles.editButton} onClick={() => setEdit(true)}>
            Edit
          </button>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>Profile Picture</span>
          <div className={styles.inputContainer}>
            <div className={styles.profileImageSection}>
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="Profile"
                  className={styles.profileImage}
                  onError={(e) => {
                    console.error("Image failed to load:", displayImage);
                    e.target.src = "https://via.placeholder.com/100";
                  }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/100"
                  alt="Placeholder"
                  className={styles.profileImage}
                />
              )}

              {edit && (
                <button className={styles.uploadButton} onClick={handleUpload}>
                  {displayImage ? "Change Photo" : "Upload Photo"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>First Name</span>
          <div className={styles.inputContainer}>
            {edit ? (
              <input
                type="text"
                name="firstName"
                placeholder="Enter Your First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className={styles.input}
              />
            ) : (
              <span className={styles.value}>
                {data.firstName || "Enter Your First Name"}
              </span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Last Name</span>
          <div className={styles.inputContainer}>
            {edit ? (
              <input
                type="text"
                name="lastName"
                placeholder="Enter Your Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className={styles.input}
              />
            ) : (
              <span className={styles.value}>
                {data.lastName || "Enter Your Last Name"}
              </span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Email</span>
          <div className={styles.inputContainer}>
            <span className={styles.value}>
              {data.email || "Enter Your Email"}
            </span>
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Phone Number</span>
          <div className={styles.inputContainer}>
            {edit ? (
              <input
                type="tel"
                name="phoneNo"
                placeholder="Enter Your Phone Number"
                value={formData.phoneNo}
                onChange={handleInputChange}
                className={styles.input}
              />
            ) : (
              <span className={styles.value}>
                {data.phoneNo || "Enter Your Phone Number"}
              </span>
            )}
          </div>
        </div>

        {!edit && (
          <div className={styles.row}>
            <span className={styles.label}></span>

            <button
              className={styles.changePassword}
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change Password
            </button>
          </div>
        )}

        {edit && (
          <div className={styles.actions}>
            {error && <p className={styles.error}>{error}</p>}
            {success && (
              <p className={styles.success}>Profile updated successfully!</p>
            )}
            <button
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className={`${styles.saveButton} ${
                isLoading ? styles.loading : ""
              }`}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleImageSave}
      />

      {isPasswordModalOpen && (
        <Password onClose={() => setIsPasswordModalOpen(false)} />
      )}
    </div>
  );
};

export default MyProfile;
