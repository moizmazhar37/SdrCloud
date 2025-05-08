// hooks/googleCalendar.ts
import axios from "axios";
import { url } from "src/config/APIConfig";

export const getConnectedIntegrations = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${url}/tenant-meeting/integrations`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });

    return res.data;
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

export const connectCalendlyAccount = async (token, calendlyToken) => {
    const res = await axios.post(`${url}/tenant-meeting/calendly-creds`, {
        access_token: calendlyToken,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
}

export const disconnectCalendlyAccount = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${url}/tenant-meeting/calendly/disconnect`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
}

export const getMeetingPreference = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${url}/tenant-meeting/preference`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
    });
    return res.data;
};

export const updateMeetingPreference = async (preference) => {
    const token = localStorage.getItem("token");
    const res = await axios.patch(`${url}/tenant-meeting/preference`, preference, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
    });
    return res.data;
};