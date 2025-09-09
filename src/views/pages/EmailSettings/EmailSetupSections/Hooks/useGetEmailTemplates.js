import { useEffect, useState } from "react";
import axios from "axios";
import { getEmailTemplates } from "src/config/APIConfig";

const useGetEmailTemplates = (templateId) => {
  const [campaignEmail, setCampaignEmail] = useState(null);
  const [reminderEmails, setReminderEmails] = useState([]);
  const [followupEmails, setFollowupEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmailTemplates = async () => {
    if (!templateId) return;

    setLoading(true);
    setError(null);

    try {


      // const templateId = localStorage.getItem("template_id"); // future-proofed
      // if (!templateId) throw new Error("Template ID not found in localStorage");

      const response = await axios.get(getEmailTemplates(templateId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;

      setCampaignEmail(data.campaign_emails); 
      setReminderEmails(data.reminder_emails || []);
      setFollowupEmails(data.followup_emails || []);  
    } catch (err) {
      console.error("Failed to fetch email templates:", err);
      const backendMessage = err?.response?.data?.detail || "Failed to fetch email templates.";
      setError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailTemplates();
  }, [templateId]);

  return { campaignEmail, reminderEmails, followupEmails, loading, error, refetch: fetchEmailTemplates  };
};

export default useGetEmailTemplates;
