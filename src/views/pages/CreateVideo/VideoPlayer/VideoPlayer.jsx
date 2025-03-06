import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.png";
import { toast } from "react-toastify";
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

  useEffect(() => {
    // Dynamically add the script when the component mounts
    const script = document.createElement("script");
    script.src =
      "https://storage.googleapis.com/static-data-for-sdrc/scripts/tracker_d26331ec-e390-4c61-afb9-56795bb856cf.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup: remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
        <video className="responsive-video" controls>
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
