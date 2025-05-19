import React, { useState, useEffect } from "react";
import styles from "./CreateAccount.module.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useAccountForm from "./hooks";
import useGetSdrcAdmins from "../Hooks/useSdrcAdmins";
import ColorInput from "src/Common/ColorInput/ColorInput";
import {
  handleLogoUpload,
  handleContractUpload,
  calculateContractEndDate,
  createPhoneChangeHandler,
  createColorChangeHandler,
} from "./helpers";

const AccountManagementPage = () => {
  const { formData, handleInputChange, handleFileChange, handleSubmit } =
    useAccountForm();
  const {
    admins,
    loading: adminsLoading,
    error: adminsError,
  } = useGetSdrcAdmins();
  const [logoFileName, setLogoFileName] = useState("");
  const [contractFileName, setContractFileName] = useState("");

  // File upload handlers
  const onLogoUpload = () =>
    handleLogoUpload(handleFileChange, setLogoFileName);
  const onContractUpload = () =>
    handleContractUpload(handleFileChange, setContractFileName);

  // Phone input handlers
  const accountPhoneHandler = createPhoneChangeHandler(
    handleInputChange,
    "accountPhoneNo"
  );
  const adminPhoneHandler = createPhoneChangeHandler(
    handleInputChange,
    "phoneNo"
  );

  // Color input handlers
  const primaryRgbHandler = createColorChangeHandler(
    handleInputChange,
    "primaryRgb"
  );
  const primaryHexHandler = createColorChangeHandler(
    handleInputChange,
    "primaryHex"
  );
  const secondaryRgbHandler = createColorChangeHandler(
    handleInputChange,
    "secondaryRgb"
  );
  const secondaryHexHandler = createColorChangeHandler(
    handleInputChange,
    "secondaryHex"
  );

  // Calculate contract end date
  useEffect(() => {
    const endDate = calculateContractEndDate(
      formData.contractedDate,
      formData.contractTerm
    );
    if (endDate) {
      handleInputChange({
        target: {
          name: "contractEndDate",
          value: endDate,
        },
      });
    }
  }, [formData.contractedDate, formData.contractTerm, handleInputChange]);

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
                onChange={accountPhoneHandler}
                containerClass={styles.phoneInputContainer}
                inputClass={styles.phoneInputField}
              />
            </div>
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
                onChange={adminPhoneHandler}
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
                <button className={styles.uploadButton} onClick={onLogoUpload}>
                  Upload Logo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SDRC Admins Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>SDRC Admins</div>
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>Select SDRC Admin</label>
              <select
                name="sdrcAdmin"
                value={formData.sdrcAdmin || ""}
                onChange={handleInputChange}
                disabled={adminsLoading}
              >
                <option value="" disabled>
                  {adminsLoading ? "Loading..." : "Select SDRC Admin"}
                </option>
                {admins.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.name}
                  </option>
                ))}
              </select>
              {adminsError && (
                <span className={styles.error}>{adminsError}</span>
              )}
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
                    onChange={primaryRgbHandler}
                  />
                </div>
                <div className={styles.colorGroup}>
                  <div className={styles.colorLabel}>HEX</div>
                  <ColorInput
                    label="Enter Your HEX Color"
                    value={formData.primaryHex}
                    onChange={primaryHexHandler}
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
                    onChange={secondaryRgbHandler}
                  />
                </div>
                <div className={styles.colorGroup}>
                  <div className={styles.colorLabel}>HEX</div>
                  <ColorInput
                    label="Enter Your HEX Color"
                    value={formData.secondaryHex}
                    onChange={secondaryHexHandler}
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
                <option value="" disabled>
                  Select
                </option>
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
                <option value="" disabled>
                  Select Category
                </option>
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

            <div className={styles.formGroup}>
              <label>Tokens per HVO</label>
              <input
                type="float"
                name="hvoPrice"
                placeholder="0.0001"
                value={formData.hvoPrice}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Token per Video per second</label>
              <input
                type="float"
                name="videoPrice"
                placeholder="0.000001"
                value={formData.videoPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className={styles.uploadContractButton}>
          <button
            className={styles.uploadFullButton}
            onClick={onContractUpload}
          >
            {contractFileName ? contractFileName : "Upload Contract"}
          </button>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.cancelButton}>Cancel</button>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Create & Send Invite To New Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountManagementPage;
