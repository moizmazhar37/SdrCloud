import React from 'react';
import styles from './MyProfile.module.scss';

const MyProfile = ({ data, headers, edit, setEdit }) => {
  const handleSave = () => {
    console.log('saved');
    setEdit(false);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleUpload = () => {
    console.log('uploaded');
  };

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
            {edit ? (
              <button 
                className={styles.uploadButton}
                onClick={handleUpload}
              >
                Upload
              </button>
            ) : (
              <span className={styles.value}>
                {data.profileImage || 'Enter Your AdminProfileImage'}
              </span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>First Name</span>
          <div className={styles.inputContainer}>
            {edit ? (
              <input
                type="text"
                placeholder="Enter Your FirstName"
                defaultValue={data.firstName}
              />
            ) : (
              <span className={styles.value}>
                {data.firstName || 'Enter Your FirstName'}
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
                placeholder="Enter Your LastName"
                defaultValue={data.lastName}
              />
            ) : (
              <span className={styles.value}>
                {data.lastName || 'Enter Your LastName'}
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
                placeholder="Enter Your AdminEmail"
                defaultValue={data.email}
              />
            ) : (
              <span className={styles.value}>
                {data.email || 'Enter Your AdminEmail'}
              </span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>PhoneNo</span>
          <div className={styles.inputContainer}>
            {edit ? (
              <input
                type="tel"
                placeholder="Enter Your PhoneNo"
                defaultValue={data.phoneNo}
              />
            ) : (
              <span className={styles.value}>
                {data.phoneNo || 'Enter Your PhoneNo'}
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
    </div>
  );
};

export default MyProfile;