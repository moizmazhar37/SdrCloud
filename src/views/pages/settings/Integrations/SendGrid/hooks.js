import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { tenantEmail } from "src/config/APIConfig";

export const useTenantEmail = () => {
    const [email, setEmail] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const checkTenantEmail = async () => {
            try {
                setLoading(true);
                const res = await axios.get(tenantEmail, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (res.data.status === "active") {
                    setEmail(res.data.email);
                    setApiKey("***********************************************");  // Hide actual key
                    setIsDisabled(true);
                }
            } catch (error) {
                toast.error("Failed to fetch email configuration");
            } finally {
                setLoading(false);
            }
        };

        checkTenantEmail();
    }, []);

    const saveTenantEmail = async () => {
        try {
            setLoading(true);
            const res = await axios.post(
                tenantEmail,
                { email_from_address: email, api_key: apiKey },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            toast.success(res.data.message);
            setIsDisabled(true);
            setApiKey("********");  // Mask API key
        } catch (error) {
            toast.error(error.response?.data?.detail || "Failed to save API key. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const deleteTenantEmail = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(tenantEmail, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            toast.warning(res.data.message);
            setEmail("");
            setApiKey("");
            setIsDisabled(false);
        } catch (error) {
            toast.error(error.response?.data?.detail || "Failed to delete configuration");
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        apiKey,
        setApiKey,
        isDisabled,
        loading,  // Added loading state
        saveTenantEmail,
        deleteTenantEmail,
    };
};
