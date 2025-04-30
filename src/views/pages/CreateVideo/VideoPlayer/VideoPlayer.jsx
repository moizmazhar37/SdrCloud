import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "./logo.png";
import { toast } from "react-toastify";
import "./VideoPlayer.css";
import ApiConfig from "./../../../../config/APIConfig";
import { videoTracking } from "src/config/APIConfig";
import { v4 as uuidv4 } from "uuid"; // Make sure to install uuid package with npm install uuid

const VideoPlayer = () => {
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trackingData, setTrackingData] = useState([]);
  const [userIP, setUserIP] = useState("");
  const videoRef = useRef(null);
  const video_id = window.location.href.split("/").pop().trim();
  const hasTrackedRef = useRef(false);
  const lastSentTimeRef = useRef(0);

  // Fetch the user's IP address using ipify API
  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setUserIP(response.data.ip);
        console.log("User IP fetched:", response.data.ip);
      } catch (err) {
        console.error("Error fetching user IP:", err);
        setUserIP(window.location.hostname); // Fallback to hostname if API fails
      }
    };

    fetchUserIP();
  }, []);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${ApiConfig.video}/${video_id}`);
        setVideoData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching video URL:", err);
        setError("Failed to load video");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoUrl();
  }, [video_id]);

  useEffect(() => {
    // Dynamically add the pixel tracking script when the component mounts
    const script = document.createElement("script");
    script.src =
      "https://storage.googleapis.com/static-data-for-sdrc/scripts/tracker_d26331ec-e390-4c61-afb9-56795bb856cf.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup: remove the script when the component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Function to prepare tracking data for sending
  const prepareTrackingData = () => {
    if (trackingData.length === 0 || !videoRef.current) return null;

    const currentTime = Math.floor(videoRef.current.currentTime);
    const totalDuration = Math.floor(videoRef.current.duration);

    // Filter out entries with duration 0 and update the rest
    const validTrackingData = trackingData
      .map((entry) => {
        if (
          entry.ip_address === userIP &&
          entry.customer_data_id === video_id
        ) {
          const updatedDuration = Math.max(entry.duration_played, currentTime);
          return {
            ...entry,
            id: entry.id, // Keep existing UUID
            duration_played: updatedDuration,
            total_duration: totalDuration,
          };
        }
        return entry;
      })
      .filter((entry) => entry.duration_played > 0); // Filter out entries with duration 0

    return validTrackingData.length > 0 ? validTrackingData : null;
  };

  // Function to send tracking data with beacon
  const sendTrackingDataBeacon = (data) => {
    if (!data) return false;

    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    const success = navigator.sendBeacon(`${videoTracking}`, blob);
    console.log("Beacon sent:", success, "with data:", data);
    return success;
  };

  // Tab close tracking
  useEffect(() => {
    const handleTabClose = () => {
      if (!hasTrackedRef.current) {
        const data = prepareTrackingData();
        if (data) {
          sendTrackingDataBeacon(data);
          hasTrackedRef.current = true;
        }
        return "Changes you made may not be saved.";
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [trackingData, userIP, video_id]);

  const handleVideoEvent = (event) => {
    if (!videoRef.current || !userIP) return;

    const currentTime = Math.floor(videoRef.current.currentTime);
    const totalDuration = Math.floor(videoRef.current.duration);

    // Check if video has a valid duration before proceeding
    if (isNaN(totalDuration) || totalDuration <= 0) {
      console.warn("Invalid video duration detected, skipping tracking");
      return;
    }

    let updatedTrackingData = [...trackingData];

    if (event.type === "play") {
      // Check if an existing session is in progress and hasn't completed
      let existingSessionIndex = updatedTrackingData.findIndex(
        (entry) =>
          entry.ip_address === userIP &&
          entry.customer_data_id === video_id &&
          entry.duration_played < totalDuration
      );

      if (existingSessionIndex === -1) {
        // No active session, create a new one with UUID
        updatedTrackingData.push({
          id: uuidv4(), // Generate UUID for this session
          ip_address: userIP,
          customer_data_id: video_id,
          duration_played: 0, // Start at 0
          total_duration: totalDuration,
        });
      }
    } else if (event.type === "pause" || event.type === "ended") {
      let existingSessionIndex = updatedTrackingData.findIndex(
        (entry) =>
          entry.ip_address === userIP &&
          entry.customer_data_id === video_id &&
          entry.duration_played < totalDuration
      );

      if (existingSessionIndex !== -1) {
        let currentEntry = updatedTrackingData[existingSessionIndex];

        if (currentTime > currentEntry.duration_played) {
          currentEntry.duration_played = currentTime;
        }

        if (event.type === "ended") {
          currentEntry.duration_played = totalDuration;
        }
      }
    }

    setTrackingData(updatedTrackingData);
    console.log(`Video event "${event.type}" logged:`, updatedTrackingData);
  };

  const handleMeetButtonClick = () => {
    const url = videoData?.meet_link || "https://meet.google.com/";
  window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <div className="video-container">
        <div className="video-preview-logo">
          <img src={videoData?.logo} alt="Logo" className="logo" />
        </div>
        <div>Loading video...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-container">
        <div className="video-preview-logo">
          <img src={videoData?.logo} alt="Logo" className="logo" />
        </div>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="video-container">
      <div className="video-preview-logo">
        <img src={videoData?.logo} alt="Logo" className="logo" />
      </div>
      {videoData.name ? (
        <div className="customer-name">Welcome {videoData.name}!</div>
      ) : (
        <div className="customer-name">Welcome User!</div>
      )}
      {videoData?.video_url && (
        <video
          className="responsive-video"
          controls
          ref={videoRef}
          onPlay={handleVideoEvent}
          onPause={handleVideoEvent}
          onEnded={handleVideoEvent}
        >
          <source src={videoData.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <button className="meet-button" onClick={handleMeetButtonClick}>
        Meet
      </button>
    </div>
  );
};

export default VideoPlayer;
