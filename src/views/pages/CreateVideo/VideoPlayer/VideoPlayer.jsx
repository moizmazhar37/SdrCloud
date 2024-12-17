import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.png";
import "./VideoPlayer.css";
import ApiConfig, { videoelement } from "./../../../../config/APIConfig";

const VideoPlayer = () => {
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const video_id = window.location.href.split("/").pop().trim();

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
        <video className="responsive-video" controls>
          <source src={videoData.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
