// hooks/googleCalendar.ts
import axios from "axios";

export const getConnectedGoogleEmail = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:8000/oauth/google/email", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });

    return res.data.email;
};

export const initiateGoogleOAuth = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:8000/oauth/api/v1/google/oauth", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });

    return res.data.auth_url;
};
