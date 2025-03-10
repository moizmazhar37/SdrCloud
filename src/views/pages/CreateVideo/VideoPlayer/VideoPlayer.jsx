import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "./logo.png";
import { toast } from "react-toastify";
import "./VideoPlayer.css";
import ApiConfig from "./../../../../config/APIConfig";

const VideoPlayer = () => {
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trackingData, setTrackingData] = useState([]);
  const videoRef = useRef(null);
  const video_id = window.location.href.split("/").pop().trim();
  const userIP = window.location.hostname; // Replace with actual IP retrieval logic

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
    const handleTabClose = async () => {
      if (trackingData.length > 0) {
        try {
          await axios.post(
            `${ApiConfig.video}/"DUMMY"/${video_id}`,
            trackingData
          );
          console.log("Data sent to backend:", trackingData);
        } catch (error) {
          console.error("Error sending tracking data:", error);
        }
      }
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => window.removeEventListener("beforeunload", handleTabClose);
  }, [trackingData, video_id]);

  const handleVideoEvent = (event) => {
    if (!videoRef.current) return;

    const currentTime = Math.floor(videoRef.current.currentTime);
    const totalDuration = Math.floor(videoRef.current.duration);
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
        // No active session, create a new one
        updatedTrackingData.push({
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
    if (videoData?.meet_link) {
      window.location.href = videoData.meet_link;
    } else {
      toast.error("Couldn't find meeting link");
    }
  };

  if (isLoading) {
    return (
      <div className="video-container">
        <div className="video-preview-logo">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div>Loading video...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-container">
        <div className="video-preview-logo">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="video-container">
      <div className="video-preview-logo">
        <img src={logo} alt="Logo" className="logo" />
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
