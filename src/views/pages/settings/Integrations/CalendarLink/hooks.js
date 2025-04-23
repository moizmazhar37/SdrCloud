// hooks/googleCalendar.ts
import axios from "axios";
import url from "src/config/APIConfig";

export const getConnectedGoogleEmail = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${url}/oauth/google/email`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });

    return res.data.email;
};

export const initiateGoogleOAuth = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${url}/oauth/api/v1/google/oauth`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });

    return res.data.auth_url;
};


export const disconnectGoogleAccount = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${url}/oauth/disconnect`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;

};