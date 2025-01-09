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
        <h2>{headers.title || 'Personal Details'}</h2>
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
        <div className={styles.field}>
          <label>Profile Picture</label>
          <div className={styles.profilePicture}>
            {edit ? (
              <button 
                className={styles.uploadButton}
                onClick={handleUpload}
              >
                Upload
              </button>
            ) : (
              <span className={styles.placeholderText}>
                {data.profileImage || 'Enter Your AdminProfileImage'}
              </span>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label>First Name</label>
          {edit ? (
            <input
              type="text"
              placeholder="Enter Your FirstName"
              defaultValue={data.firstName}
            />
          ) : (
            <span className={styles.placeholderText}>
              {data.firstName || 'Enter Your FirstName'}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label>Last Name</label>
          {edit ? (
            <input
              type="text"
              placeholder="Enter Your LastName"
              defaultValue={data.lastName}
            />
          ) : (
            <span className={styles.placeholderText}>
              {data.lastName || 'Enter Your LastName'}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label>Email</label>
          {edit ? (
            <input
              type="email"
              placeholder="Enter Your AdminEmail"
              defaultValue={data.email}
            />
          ) : (
            <span className={styles.placeholderText}>
              {data.email || 'Enter Your AdminEmail'}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label>PhoneNo</label>
          {edit ? (
            <input
              type="tel"
              placeholder="Enter Your PhoneNo"
              defaultValue={data.phoneNo}
            />
          ) : (
            <span className={styles.placeholderText}>
              {data.phoneNo || 'Enter Your PhoneNo'}
            </span>
          )}
        </div>

        <div className={styles.changePassword}>
          <a href="#change-password">Change Password</a>
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