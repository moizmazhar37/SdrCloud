import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Add this import
import Dropdown from "src/Common/Dropdown/Dropdown";
import Table from "src/Common/Table/Table";
import useTemplateList from "../../Create/Hooks/useTemplateList";
import { useGoogleSheetsData } from "../../settings/GoogleSheets/hooks";
import useSaveAgent from "./Hooks/useSaveAgent";
import useGetAgents from "./Hooks/useGetAgents";
import Loader from "src/Common/Loader/Loader";
import styles from "./Agent.module.scss";

const Agent = () => {
  const history = useHistory();

  const {
    data: agents,
    loading: agentsLoading,
    error: agentsError,
    refetch: refetchAgents, // Destructure the refetch function
  } = useGetAgents();
  const { data: sheets } = useGoogleSheetsData();
  console.log(sheets);
  const { data } = useTemplateList();
  const { loading, error, data: saveData, postAgent } = useSaveAgent();

  const [formData, setFormData] = useState({
    email: "",
    agentName: "",
    selectedTemplate: "",
    templateType: "HVO",
  });

  const [errors, setErrors] = useState({});

  // Generate template options based on selected template type
  const getTemplateOptions = () => {
    if (!data || !data[formData.templateType]) return [];

    return data[formData.templateType].map((template) => ({
      label: template.template_name,
      value: template.id,
      onClick: () => handleDropdownChange(template.id),
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleTemplateTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      templateType: type,
      selectedTemplate: "", // Clear selected template when switching types
    }));

    // Clear template selection error when switching types
    if (errors.selectedTemplate) {
      setErrors((prev) => ({
        ...prev,
        selectedTemplate: "",
      }));
    }
  };

  const handleDropdownChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      selectedTemplate: value,
    }));

    // Clear error when user selects
    if (errors.selectedTemplate) {
      setErrors((prev) => ({
        ...prev,
        selectedTemplate: "",
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate agent name
    if (!formData.agentName.trim()) {
      newErrors.agentName = "Agent name is required";
    }

    // Validate template selection
    if (!formData.selectedTemplate) {
      newErrors.selectedTemplate = "Please select a template";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Handle form submission here
    }
  };

  const handleSave = async () => {
    // Validate form before saving
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log("Saving form data:", formData);

        // Call the postAgent function from the hook
        await postAgent(
          formData.agentName,
          formData.email,
          formData.selectedTemplate
        );

        console.log("Agent saved successfully!");

        // Refetch agents list after successful save
        await refetchAgents();

        // Optionally clear the form after successful save
        setFormData({
          email: "",
          agentName: "",
          selectedTemplate: "",
          templateType: "HVO",
        });

        // Clear any errors
        setErrors({});
      } catch (error) {
        console.error("Error saving agent:", error);
        // Error handling is already done in the hook via toast
      }
    }
  };

  // Handle campaign button click - Updated to navigate with agent ID
  const handleCampaignClick = (agent) => {
    console.log("Campaign clicked for agent:", agent.name);
    // Navigate to the agent-campaign route with the agent ID
    history.push(`/agent-campaign/${agent.id}`);
  };

  // Table headers configuration
  const headers = [
    { label: "Agent Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Template ID", key: "template_id" },
    { label: "Actions", key: "actions" },
  ];

  // Transform agents data for the table - Updated to pass entire agent object
  const transformedAgentsData = (agents || []).map((agent) => ({
    ...agent,
    actions: (
      <button
        className={styles.campaignButton}
        onClick={() => handleCampaignClick(agent)} // Pass the entire agent object
      >
        Campaign
      </button>
    ),
  }));

  const templateOptions = getTemplateOptions();
  const selectedTemplateName = templateOptions.find(
    (opt) => opt.value === formData.selectedTemplate
  )?.label;

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              placeholder="e.g. example@domain.com"
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Agent Name:</label>
            <input
              type="text"
              name="agentName"
              value={formData.agentName}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.agentName ? styles.error : ""
              }`}
              placeholder="e.g. John Doe"
            />
            {errors.agentName && (
              <span className={styles.errorMessage}>{errors.agentName}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Template Type:</label>
            <div className={styles.switchContainer}>
              <button
                type="button"
                className={`${styles.switchButton} ${
                  formData.templateType === "HVO" ? styles.active : ""
                }`}
                onClick={() => handleTemplateTypeChange("HVO")}
              >
                HVO
              </button>
              <button
                type="button"
                className={`${styles.switchButton} ${
                  formData.templateType === "VIDEO" ? styles.active : ""
                }`}
                onClick={() => handleTemplateTypeChange("VIDEO")}
              >
                VIDEO
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Select Template:</label>
            <div
              className={`${styles.dropdownContainer} ${
                errors.selectedTemplate ? styles.error : ""
              }`}
            >
              <Dropdown
                options={templateOptions}
                buttonText={selectedTemplateName || "Select Template"}
              />
            </div>
            {errors.selectedTemplate && (
              <span className={styles.errorMessage}>
                {errors.selectedTemplate}
              </span>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleSave}
              className={styles.saveButton}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="submit" className={styles.nextButton}>
              Next
            </button>
          </div>
        </form>
      </div>

      {/* Agents Table Section */}
      <div className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>Existing Agents</h2>
        {agentsLoading ? (
          <div>
            <Loader />
          </div>
        ) : agentsError ? (
          <div>Error loading agents</div>
        ) : (
          <Table headers={headers} data={transformedAgentsData} />
        )}
      </div>
    </div>
  );
};

export default Agent;
