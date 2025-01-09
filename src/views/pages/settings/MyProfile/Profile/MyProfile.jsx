import React, { useState, useEffect } from 'react';
import ImageModal from '../ImageModal/ImageModal';
import styles from './MyProfile.module.scss';

const MyProfile = ({ data, headers, edit, setEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(data.profileImage || null);
  const [tempImage, setTempImage] = useState(null);

  // Update profileImage state if data.profileImage changes
  useEffect(() => {
    setProfileImage(data.profileImage);
  }, [data.profileImage]);

  const handleSave = () => {
    console.log('Saved profile data');
    if (tempImage) {
      setProfileImage(tempImage);
    }
    setTempImage(null);
    setEdit(false);
  };

  const handleCancel = () => {
    setTempImage(null);
    setEdit(false);
  };

  const handleUpload = () => {
    setIsModalOpen(true);
  };

  const handleImageSave = (imageData) => {
    setTempImage(imageData);
    console.log('New profile image saved:', imageData);
  };

  // Determine which image to display
  const displayImage = edit ? (tempImage || profileImage) : profileImage;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Personal Details</span>
        {!edit && (
          <button 
            className={styles.editButton}
            onClick={() => setEdit(true)}
          >
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
                    console.error('Image failed to load:', displayImage);
                    e.target.src = 'https://via.placeholder.com/100';
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
                <button 
                  className={styles.uploadButton}
                  onClick={handleUpload}
                >
                  {displayImage ? 'Change Photo' : 'Upload Photo'}
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
                placeholder="Enter Your First Name"
                defaultValue={data.firstName}
              />
            ) : (
              <span className={styles.value}>
                {data.firstName || 'Enter Your First Name'}
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
                placeholder="Enter Your Last Name"
                defaultValue={data.lastName}
              />
            ) : (
              <span className={styles.value}>
                {data.lastName || 'Enter Your Last Name'}
              </span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Email</span>
          <div className={styles.inputContainer}>
            {edit ? (
              <input
                type="email"
                placeholder="Enter Your Email"
                defaultValue={data.email}
              />
            ) : (
              <span className={styles.value}>
                {data.email || 'Enter Your Email'}
              </span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Phone Number</span>
          <div className={styles.inputContainer}>
            {edit ? (
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                defaultValue={data.phoneNo}
              />
            ) : (
              <span className={styles.value}>
                {data.phoneNo || 'Enter Your Phone Number'}
              </span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.label}></span>
          <div className={styles.inputContainer}>
            <a href="#" className={styles.changePassword}>Change Password</a>
          </div>
        </div>

        {edit && (
          <div className={styles.actions}>
            <button 
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              className={styles.saveButton}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </div>

      <ImageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleImageSave}
      />
    </div>
  );
};

export default MyProfile;