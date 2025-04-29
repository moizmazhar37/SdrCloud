import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Mail, Video, ChevronDown, Plus, Check } from "lucide-react";
import styles from "./EmailSchedulng.module.scss";
import useTemplateList from "../../Create/Hooks/useTemplateList";
import useTemplates from "../EmailTemplates/hooks";
import useSaveScheduleEmails from "./Hooks/useSaveScheduleEmails";

const EmailScheduling = () => {
  const [selectedType, setSelectedType] = useState("hvo");
  const { emailTemplatesList, emailLoading, emailError } = useTemplates();
  const { data: templates, loading, error } = useTemplateList();
  const { saveSchedule, saving } = useSaveScheduleEmails();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getFirstTemplateId = () => {
    const type = selectedType.toUpperCase();
    return templates?.[type]?.[0]?.id || "";
  };

  const getFirstEmailTemplateId = () => {
    return emailTemplatesList?.[0]?.id || "";
  };

  const [forms, setForms] = useState([
    {
      id: Date.now(),
      templateId: getFirstTemplateId(),
      emailTemplateId: getFirstEmailTemplateId(),
      date: formatDate(new Date()),
      removing: false,
    },
  ]);

  useEffect(() => {
    if (templates && emailTemplatesList) {
      setForms((prevForms) =>
        prevForms.map((form) => ({
          ...form,
          templateId: getFirstTemplateId(),
          emailTemplateId: getFirstEmailTemplateId(),
        }))
      );
    }
  }, [templates, emailTemplatesList]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    const firstId = templates?.[type.toUpperCase()]?.[0]?.id || "";
    setForms((prevForms) =>
      prevForms.map((form) => ({
        ...form,
        templateId: firstId,
      }))
    );
  };

  const handleTemplateChange = (id, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, templateId: value } : form
      )
    );
  };

  const handleEmailTemplateChange = (id, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, emailTemplateId: value } : form
      )
    );
  };

  const handleDateChange = (id, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, date: value } : form
      )
    );
  };

  const addForm = () => {
    if (forms.length < 3) {
      const newForm = {
        id: Date.now(),
        templateId: getFirstTemplateId(),
        emailTemplateId: getFirstEmailTemplateId(),
        date: formatDate(new Date()),
        removing: false,
      };
      setForms((prevForms) => [...prevForms, newForm]);
    }
  };

  const removeForm = (id) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, removing: true } : form
      )
    );
  };

  const handleAnimationEnd = (id) => {
    setForms((prevForms) => prevForms.filter((form) => form.id !== id));
  };

  const getTemplateOptions = () => {
    const type = selectedType.toUpperCase();
    return templates?.[type] || [];
  };

  const handleScheduleEmails = async () => {
    try {
      const scheduleData = forms.map((form, index) => ({
        template_id: form.templateId,
        email_template_id: form.emailTemplateId,
        scheduled_time: new Date(form.date).toISOString(),
        schedule_sequence: index + 1,
      }));
      await saveSchedule(scheduleData);
      toast.success("Emails scheduled successfully!");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to schedule emails. Please try again."; // Fallback
      toast.error(message);
    }
  };

  return (
    <div className={styles.emailSchedulingContainer}>
      <h1 className={styles.title}>Email Scheduling</h1>

      <div className={styles.typeSelector}>
        <button
          className={`${styles.typeButton} ${
            selectedType === "hvo" ? styles.active : ""
          }`}
          onClick={() => handleTypeChange("hvo")}
        >
          <Mail className={styles.icon} />
          <span>HVO</span>
        </button>
        <button
          className={`${styles.typeButton} ${
            selectedType === "video" ? styles.active : ""
          }`}
          onClick={() => handleTypeChange("video")}
        >
          <Video className={styles.icon} />
          <span>Video</span>
        </button>
      </div>

      <div className={styles.formsSection}>
        {forms.map((form, index) => (
          <div
            key={form.id + (form.removing ? "-removing" : "")}
            className={`${styles.formCard} ${
              form.removing ? styles.fadeOut : styles.fadeIn
            }`}
            onAnimationEnd={() => form.removing && handleAnimationEnd(form.id)}
          >
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Schedule {index + 1}</h3>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor={`template-${form.id}`}>
                {selectedType === "hvo" ? "HVO Template" : "Video Template"}
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id={`template-${form.id}`}
                  value={form.templateId}
                  onChange={(e) =>
                    handleTemplateChange(form.id, e.target.value)
                  }
                  className={styles.select}
                >
                  {getTemplateOptions().length === 0 ? (
                    <option disabled>No templates available</option>
                  ) : (
                    getTemplateOptions().map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.template_name}
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown className={styles.selectIcon} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor={`email-template-${form.id}`}>
                Email Template
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id={`email-template-${form.id}`}
                  value={form.emailTemplateId}
                  onChange={(e) =>
                    handleEmailTemplateChange(form.id, e.target.value)
                  }
                  className={styles.select}
                >
                  {emailTemplatesList?.length === 0 ? (
                    <option disabled>No templates available</option>
                  ) : (
                    emailTemplatesList.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown className={styles.selectIcon} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor={`date-${form.id}`}>Schedule Date</label>
              <div className={styles.dateWrapper}>
                <input
                  type="date"
                  id={`date-${form.id}`}
                  value={form.date}
                  onChange={(e) => handleDateChange(form.id, e.target.value)}
                  className={styles.dateInput}
                />
              </div>
            </div>
          </div>
        ))}

        {forms.length < 3 && (
          <button className={styles.addButton} onClick={addForm}>
            <Plus className={styles.plusIcon} />
            <span>Add More</span>
          </button>
        )}
      </div>

      <button
        className={styles.submitButton}
        onClick={handleScheduleEmails}
        disabled={saving}
      >
        <span>{saving ? "Scheduling..." : "Schedule Emails"}</span>
        <Check size={16} />
      </button>
    </div>
  );
};

export default EmailScheduling;
