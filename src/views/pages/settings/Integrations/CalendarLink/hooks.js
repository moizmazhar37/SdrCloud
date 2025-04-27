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

export const connectCalendlyAccount = async (calendlyToken) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${url}/tenant-meeting/integrations/calendly`, {
        token: calendlyToken,
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
    const res = await axios.delete(`${url}/tenant-meeting/integrations/calendly`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data;
}