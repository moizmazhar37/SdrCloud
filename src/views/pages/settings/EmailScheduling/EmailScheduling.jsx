import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Mail, Video, ChevronDown, Plus, Check } from "lucide-react";
import styles from "./EmailSchedulng.module.scss";
import useTemplateList from "../../Create/Hooks/useTemplateList";
import useTemplates from "../EmailTemplates/hooks";
import useSaveScheduleEmails from "./Hooks/useSaveScheduleEmails";
import useFetchScheduleEmails from "./Hooks/useFetchScheduleEmails";

const EmailScheduling = () => {
  const [selectedType, setSelectedType] = useState("hvo");
  const { emailTemplatesList } = useTemplates();
  const { data: templates } = useTemplateList();
  const { saveSchedule, saving } = useSaveScheduleEmails();
  const { schedules, loadingSchedules } = useFetchScheduleEmails();

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [forms, setForms] = useState([]);

  useEffect(() => {
    if (schedules && emailTemplatesList && templates) {
      const formatted = schedules.map((item) => ({
        id: Date.now() + Math.random(), // unique ID
        templateId: item.template_id,
        emailTemplateId: item.email_template_id,
        date: formatDate(item.scheduled_time),
        removing: false,
      }));
      setForms(formatted);
    } else if (!schedules?.length && emailTemplatesList && templates) {
      // fallback form if no schedules exist
      setForms([
        {
          id: Date.now(),
          templateId: templates?.[selectedType.toUpperCase()]?.[0]?.id || "",
          emailTemplateId: emailTemplatesList?.[0]?.id || "",
          date: formatDate(new Date()),
          removing: false,
        },
      ]);
    }
  }, [schedules, templates, emailTemplatesList]);

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

  const updateFormField = (id, field, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, [field]: value } : form
      )
    );
  };

  const addForm = () => {
    if (forms.length < 3 && templates && emailTemplatesList) {
      const newForm = {
        id: Date.now(),
        templateId: templates?.[selectedType.toUpperCase()]?.[0]?.id || "",
        emailTemplateId: emailTemplatesList?.[0]?.id || "",
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
    return templates?.[selectedType.toUpperCase()] || [];
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
        "Failed to schedule emails. Please try again.";
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
                    updateFormField(form.id, "templateId", e.target.value)
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
                    updateFormField(form.id, "emailTemplateId", e.target.value)
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
                  onChange={(e) =>
                    updateFormField(form.id, "date", e.target.value)
                  }
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
