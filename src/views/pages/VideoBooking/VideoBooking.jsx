import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "./VideoBooking.css";
import ApiConfig from "../../../config/APIConfig";
import { videoTracking } from "src/config/APIConfig";
import { v4 as uuidv4 } from "uuid";
import useTriggerCalendlyMeeting from "../CreateVideo/VideoPlayer/Hooks/useCalendlyTrigger";
import VideoPlayerComponent from "./components/VideoPlayerComponent";
import BookingCalendar from "./components/BookingCalendar";
import logo from "../CreateVideo/VideoPlayer/logo.png";

const VideoBooking = () => {
  const { customerId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trackingData, setTrackingData] = useState([]);
  const [userIP, setUserIP] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    selectedDate: null,
    selectedTime: null,
    name: "",
    email: "",
  });

  const videoRef = useRef(null);
  // Use provided customerId or default test ID
  const video_id = customerId || "5fa51948-ce8e-48c6-81ef-97123531a72f";
  const hasTrackedRef = useRef(false);
  const lastSentTimeRef = useRef(0);

  const { triggerMeeting } = useTriggerCalendlyMeeting();

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

  const handleNext = () => {
    if (
      currentStep === 1 &&
      (!bookingData.selectedDate || !bookingData.selectedTime)
    ) {
      toast.error("Please select a date and time slot");
      return;
    }
    if (currentStep === 2 && (!bookingData.name || !bookingData.email)) {
      toast.error("Please fill in your details");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleBookingConfirm = async () => {
    try {
      // Here you would typically send booking data to your API
      console.log("Booking confirmed:", bookingData);
      toast.success("Booking confirmed successfully!");

      // Trigger calendly meeting if needed
      if (videoData?.tenant_id) {
        await triggerMeeting(videoData.tenant_id);
      }
    } catch (err) {
      console.error("Error confirming booking:", err);
      toast.error("Failed to confirm booking");
    }
  };

  if (isLoading) {
    return (
      <div className="video-booking-container">
        <div className="loading-spinner">Loading video...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-booking-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="video-booking-container">
      <div className="video-booking-header">
        <img src={logo} alt="SDRCloud" className="brand-logo" />
      </div>
      
      <div className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">AI-Powered</span>
          <h1 className="hero-title">Your Marketing Machine</h1>
          <p className="hero-subtitle">
            Transform prospects into customers with intelligent video personalization and streamlined sales processes.
          </p>
        </div>
      </div>
      <div className="video-booking-layout">
        <div className="video-section">
          <VideoPlayerComponent
            videoData={videoData}
            videoRef={videoRef}
            onVideoEvent={handleVideoEvent}
          />
          <div className="personalized-message-banner">
            <h2 className="personalized-title">
              Ready to get started?
            </h2>
            <p className="personalized-subtitle">
              Use the calendar on the right to schedule your discovery call. Choose a time that works best for you and let's discuss how we can help grow your business.
            </p>
          </div>
        </div>
        <div className="booking-section">
          <BookingCalendar
            currentStep={currentStep}
            bookingData={bookingData}
            setBookingData={setBookingData}
            onNext={handleNext}
            onBack={handleBack}
            onConfirm={handleBookingConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoBooking;
