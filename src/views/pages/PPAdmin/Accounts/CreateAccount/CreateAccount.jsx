import React, { useState, useEffect } from 'react';
import styles from './CreateAccount.module.scss';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import useAccountForm from './hooks';
import ColorInput from 'src/Common/ColorInput/ColorInput';

const AccountManagementPage = () => {
  const { formData, handleInputChange, handleFileChange, handleSubmit } = useAccountForm();
  const [logoFileName, setLogoFileName] = useState('');
  const [contractFileName, setContractFileName] = useState('');

  const handleLogoUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFileChange(e, 'logo');
        setLogoFileName(file.name);
      }
    };
    fileInput.click();
  };

  const handleContractUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFileChange(e, 'contractPdf');
        setContractFileName(file.name);
      }
    };
    fileInput.click();
  };

  useEffect(() => {
    if (formData.contractedDate && formData.contractTerm) {
      const startDate = new Date(formData.contractedDate);
      let endDate = new Date(startDate);
      
      switch (formData.contractTerm) {
        case 'Trial':
          endDate.setDate(startDate.getDate() + 7); // One week for trial
          break;
        case '3 Months':
          endDate.setMonth(startDate.getMonth() + 3);
          break;
        case '6 Months':
          endDate.setMonth(startDate.getMonth() + 6);
          break;
        case '1 Year':
          endDate.setFullYear(startDate.getFullYear() + 1);
          break;
        case '2 Years':
          endDate.setFullYear(startDate.getFullYear() + 2);
          break;
        case '3 Years':
          endDate.setFullYear(startDate.getFullYear() + 3);
          break;
        case '4 Years':
          endDate.setFullYear(startDate.getFullYear() + 4);
          break;
        default:
          break;
      }
      
      // Format the date as YYYY-MM-DD for the input field
      const formattedEndDate = endDate.toISOString().split('T')[0];
      
      // Update the end date in the form data
      handleInputChange({ 
        target: { 
          name: 'contractEndDate', 
          value: formattedEndDate 
        } 
      });
    }
  }, [formData.contractedDate, formData.contractTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        {/* Account Details Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Account Details</div>
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>Account Name</label>
              <input
                type="text"
                name="userName"
                placeholder="Enter Account Name"
                value={formData.userName}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Account Phone</label>
              <PhoneInput
                country="us"
                value={formData.accountPhoneNo}
                onChange={(phone) => handleInputChange({ target: { name: 'accountPhoneNo', value: phone } })}
                containerClass={styles.phoneInputContainer}
                inputClass={styles.phoneInputField}
              />
            </div>

            {/* <div className={styles.formGroup}>
              <label>Assign SDRCloud.ai Admin to this Account</label>
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleInputChange}
              >
                <option value="" disabled>Select PP Admin</option>
                <option value="admin">Admin</option>
                <option value="superAdmin">Super Admin</option>
              </select>
            </div> */}
          </div>
        </div>

        {/* Create Account Admin Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Create Account Admin</div>
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>Admin First Name</label>
              <input 
                type="text" 
                name="firstName" 
                placeholder="Enter Admin First Name" 
                value={formData.firstName} 
                onChange={handleInputChange} 
              />
            </div>

            <div className={styles.formGroup}>
              <label>Admin Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                placeholder="Enter Admin Last Name" 
                value={formData.lastName} 
                onChange={handleInputChange} 
              />
            </div>

            <div className={styles.formGroup}>
              <label>Account Admin Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter Email" 
                value={formData.email} 
                onChange={handleInputChange} 
              />
            </div>

            <div className={styles.formGroup}>
              <label>Account Admin Phone</label>
              <PhoneInput
                country="us"
                value={formData.phoneNo}
                onChange={(phone) => handleInputChange({ target: { name: 'phoneNo', value: phone } })}
                containerClass={styles.phoneInputContainer}
                inputClass={styles.phoneInputField}
              />
            </div>
          </div>
        </div>

        {/* Account Logo Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Account Logo</div>
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>Upload Logo</label>
              <div className={styles.uploadContainer}>
                <input
                  type="text"
                  placeholder="Upload Account Logo"
                  value={logoFileName}
                  readOnly
                  className={styles.uploadInput}
                />
                <button
                  className={styles.uploadButton}
                  onClick={handleLogoUpload}
                >
                  Upload Logo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details Colors Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Account Details</div>
          <div className={styles.sectionContent}>
            <div className={styles.colorSection}>
              <div className={styles.colorHeader}>Primary Color</div>
              <div className={styles.colorInputs}>
                <div className={styles.colorGroup}>
                  <div className={styles.colorLabel}>RGB</div>
                  <ColorInput 
                    label="Enter Your RGB Color" 
                    value={formData.primaryRgb} 
                    onChange={(color) => handleInputChange({ target: { name: 'primaryRgb', value: color } })} 
                  />
                </div>
                <div className={styles.colorGroup}>
                  <div className={styles.colorLabel}>HEX</div>
                  <ColorInput 
                    label="Enter Your HEX Color" 
                    value={formData.primaryHex} 
                    onChange={(color) => handleInputChange({ target: { name: 'primaryHex', value: color } })} 
                  />
                </div>
              </div>
            </div>

            <div className={styles.colorSection}>
              <div className={styles.colorHeader}>Secondary Color</div>
              <div className={styles.colorInputs}>
                <div className={styles.colorGroup}>
                  <div className={styles.colorLabel}>RGB</div>
                  <ColorInput 
                    label="Enter Your RGB Color" 
                    value={formData.secondaryRgb} 
                    onChange={(color) => handleInputChange({ target: { name: 'secondaryRgb', value: color } })} 
                  />
                </div>
                <div className={styles.colorGroup}>
                  <div className={styles.colorLabel}>HEX</div>
                  <ColorInput 
                    label="Enter Your HEX Color" 
                    value={formData.secondaryHex} 
                    onChange={(color) => handleInputChange({ target: { name: 'secondaryHex', value: color } })} 
                  />
                </div>
              </div>
            </div>

            <div className={styles.linkSection}>
              <div className={styles.formGroup}>
                <label>Book Demo URL</label>
                <input 
                  type="text" 
                  name="bookDemoButton" 
                  placeholder="Enter Link" 
                  value={formData.bookDemoButton} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Redirect Link</label>
                <input 
                  type="text" 
                  name="redirectLinks" 
                  placeholder="Enter Link" 
                  value={formData.redirectLinks} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightColumn}>
        {/* Contract Term Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Contract Term</div>
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>Package Name</label>
              <input 
                type="text" 
                name="packageName" 
                placeholder="Enter Package Name" 
                value={formData.packageName} 
                onChange={handleInputChange} 
              />
            </div>

            <div className={styles.formGroup}>
              <label>Contract Date</label>
              <input
                type="date"
                name="contractedDate"
                placeholder="MM/DD/YYYY"
                value={formData.contractedDate}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Contract Term</label>
              <select
                name="contractTerm"
                value={formData.contractTerm}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select</option>
                <option value="Trial">Trial</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Contract End Date</label>
              <input
                type="date"
                name="contractEndDate"
                placeholder="MM/DD/YYYY"
                value={formData.contractEndDate}
                disabled
                className={styles.disabledInput}
              />
            </div>
          </div>
        </div>

        {/* Contract Details Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Contract Details</div>
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>Customer Type</label>
              <select
                name="customerType"
                value={formData.customerType}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select Category</option>
                <option value="Startup">Startup</option>
                <option value="ENT">ENT</option>
                <option value="MM">MM</option>
                <option value="SMB">SMB</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Contracted Users</label>
              <input
                type="number"
                name="contractedUsers"
                placeholder="00"
                value={formData.contractedUsers}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Media Credits</label>
              <input
                type="number"
                name="mediaCredits"
                placeholder="00"
                value={formData.mediaCredits}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Active Media Limit</label>
              <input
                type="number"
                name="activeMediaLimits"
                placeholder="00"
                value={formData.activeMediaLimits}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className={styles.uploadContractButton}>
          <button
            className={styles.uploadFullButton}
            onClick={handleContractUpload}
          >
            {contractFileName ? contractFileName : 'Upload Contract'}
          </button>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.cancelButton}>
            Cancel
          </button>
          <button 
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            Create & Send Invite To New Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountManagementPage;