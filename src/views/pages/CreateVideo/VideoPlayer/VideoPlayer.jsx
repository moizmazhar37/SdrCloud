import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "./logo.png";
import { toast } from "react-toastify";
import "./VideoPlayer.css";
import ApiConfig from "./../../../../config/APIConfig";
import { videoTracking } from "src/config/APIConfig";
import { v4 as uuidv4 } from "uuid";
import useTriggerCalendlyMeeting from "./Hooks/useCalendlyTrigger";

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

  const { triggerMeeting } = useTriggerCalendlyMeeting(); // ⬅️ Calendly hook

  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setUserIP(response.data.ip);
      } catch (err) {
        console.error("Error fetching user IP:", err);
        setUserIP(window.location.hostname);
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
    const script = document.createElement("script");
    script.src =
      "https://storage.googleapis.com/static-data-for-sdrc/scripts/tracker_d26331ec-e390-4c61-afb9-56795bb856cf.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const prepareTrackingData = () => {
    if (trackingData.length === 0 || !videoRef.current) return null;

    const currentTime = Math.floor(videoRef.current.currentTime);
    const totalDuration = Math.floor(videoRef.current.duration);

    const validTrackingData = trackingData
      .map((entry) => {
        if (
          entry.ip_address === userIP &&
          entry.customer_data_id === video_id
        ) {
          const updatedDuration = Math.max(entry.duration_played, currentTime);
          return {
            ...entry,
            id: entry.id,
            duration_played: updatedDuration,
            total_duration: totalDuration,
          };
        }
        return entry;
      })
      .filter((entry) => entry.duration_played > 0);

    return validTrackingData.length > 0 ? validTrackingData : null;
  };

  const sendTrackingDataBeacon = (data) => {
    if (!data) return false;

    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    const success = navigator.sendBeacon(`${videoTracking}`, blob);
    console.log("Beacon sent:", success, "with data:", data);
    return success;
  };

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

    if (isNaN(totalDuration) || totalDuration <= 0) {
      console.warn("Invalid video duration detected, skipping tracking");
      return;
    }

    let updatedTrackingData = [...trackingData];

    if (event.type === "play") {
      let existingSessionIndex = updatedTrackingData.findIndex(
        (entry) =>
          entry.ip_address === userIP &&
          entry.customer_data_id === video_id &&
          entry.duration_played < totalDuration
      );

      if (existingSessionIndex === -1) {
        updatedTrackingData.push({
          id: uuidv4(),
          ip_address: userIP,
          customer_data_id: video_id,
          duration_played: 0,
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

  // ✅ Calendly trigger before open
  const handleMeetButtonClick = async () => {
    const url = videoData?.meet_link || "https://meet.google.com/";
    const tenantId = videoData?.tenant_id;

    try {
      if (tenantId) {
        await triggerMeeting(tenantId);
        console.log("Calendly meeting triggered");
      }
    } catch (err) {
      console.error("Error triggering meeting, proceeding to link.");
    } finally {
      window.open(url, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="video-container">
        <div className="video-preview-logo">
          <img src={videoData?.logo || logo} alt="Logo" className="logo" />
        </div>
        <div>Loading video...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-container">
        <div className="video-preview-logo">
          <img src={videoData?.logo || logo} alt="Logo" className="logo" />
        </div>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="video-container">
      <div className="video-preview-logo">
        <img src={videoData?.logo || logo} alt="Logo" className="logo" />
      </div>
      <div className="customer-name">Welcome {videoData?.name || "User"}!</div>
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
