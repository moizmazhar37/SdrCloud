import React from "react";
import "./VideoPlayerComponent.css";
import logo from "../../CreateVideo/VideoPlayer/logo.png";

const VideoPlayerComponent = ({ videoData, videoRef, onVideoEvent }) => {
  return (
    <div className="video-player-wrapper">
      {/* Video Section */}
      <div className="video-content">
        <div className="video-wrapper">
          {videoData?.video_url && (
            <video
              className="main-video"
              controls
              ref={videoRef}
              onPlay={onVideoEvent}
              onPause={onVideoEvent}
              onEnded={onVideoEvent}
              poster={videoData?.thumbnail}
            >
              <source src={videoData.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Message Section */}
        <div className="message-section">
          <h1 className="message-title">
            Your personalized message {videoData?.company}
          </h1>
          <p className="message-subtitle">
            We've prepared this short video to walk you through our proposal.
            Please book a time to chat with us below.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerComponent;
