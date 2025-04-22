// components/GoogleCalendarConnect.jsx
import React from "react";
import axios from "axios";

const GoogleCalendarConnect = () => {
  const handleConnect = async () => {
    try {
      const response = await axios.get("http://localhost:8000/oauth/api/v1/google/oauth", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // send token to authenticate user
        },
        withCredentials: true,
      });

      // This should redirect to Google Auth screen
      if (response.request.responseURL) {
        window.location.href = response.request.responseURL;
      }
    } catch (error) {
      console.error("OAuth initiation failed:", error);
      alert("Failed to connect calendar.");
    }
  };

  return (
    <button onClick={handleConnect} className="btn btn-primary">
      Connect Google Calendar
    </button>
  );
};

export default GoogleCalendarConnect;
