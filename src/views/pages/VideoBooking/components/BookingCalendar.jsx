import React, { useState } from "react";
import { InlineWidget } from "react-calendly";
import styles from "./BookingCalendar.module.scss";

const BookingCalendar = ({ meetType, meetLink }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });

  // Calendar navigation state
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // ---------- Calendar Data ----------
  const generateCalendarDates = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    // Start calendar on Sunday
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const dates = [];
    const current = new Date(startDate);

    // Generate 6 weeks of dates
    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    }

    return dates;
  };

  const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
  ];

  const calendarDates = generateCalendarDates();

  // Month names for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // ---------- Handlers ----------
  const navigateMonth = (direction) => {
    if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
    // Clear selected date when navigating months
    setSelectedDate(null);
  };

  const handleDateSelect = (date) => {
    if (date.getMonth() === currentMonth && date >= today) {
      setSelectedDate(date);
    }
  };

  const handleTimeSelect = (time) => setSelectedTime(time);

  const handleNextStep = () => {
    if (currentStep === 1 && selectedDate && selectedTime) {
      setCurrentStep(2);
    } else if (currentStep === 2 && userDetails.name && userDetails.email) {
      setCurrentStep(3);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isDateDisabled = (date) =>
    date.getMonth() !== currentMonth || date < today;

  const isDateSelected = (date) =>
    selectedDate && date.toDateString() === selectedDate.toDateString();

  // ---------- Step 1: Calendar ----------
  const renderCalendarStep = () => (
    <div className={styles.calendarStep}>
      <div className={styles.calendarHeader}>
        <button
          className={styles.navButton}
          onClick={() => navigateMonth("prev")}
        >
          &lt;
        </button>
        <h3>
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <button
          className={styles.navButton}
          onClick={() => navigateMonth("next")}
        >
          &gt;
        </button>
      </div>

      <div className={styles.calendar}>
        <div className={styles.weekDays}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.calendarGrid}>
          {calendarDates.map((date, index) => (
            <button
              key={index}
              className={`${styles.dateButton} 
                ${isDateSelected(date) ? styles.selected : ""} 
                ${isDateDisabled(date) ? styles.disabled : ""}`}
              onClick={() => handleDateSelect(date)}
              disabled={isDateDisabled(date)}
            >
              {date.getDate()}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.timezone}>
        <span className={styles.timezoneIcon}>🌐</span>
        <span>Asia/Karachi</span>
      </div>

      <div className={styles.timeSlots}>
        {timeSlots.map((time) => (
          <button
            key={time}
            className={`${styles.timeSlot} ${
              selectedTime === time ? styles.selected : ""
            }`}
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );

  // ---------- Step 2: Details ----------
  const renderDetailsStep = () => (
    <div className={styles.detailsStep}>
      <div className={styles.inputGroup}>
        <label htmlFor="name">Name</label>
        <div className={styles.inputWrapper}>
          <span className={styles.inputIcon}>👤</span>
          <input
            type="text"
            id="name"
            value={userDetails.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Test"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <div className={styles.inputWrapper}>
          <span className={styles.inputIcon}>✉️</span>
          <input
            type="email"
            id="email"
            value={userDetails.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="testok@redcoast.co"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.reminderBox}>
        <div className={styles.reminderIcon}>ℹ️</div>
        <div className={styles.reminderContent}>
          <strong>A friendly reminder</strong>
          <p>Please only book if you intend to show up.</p>
        </div>
      </div>

      <div className={styles.projectNote}>
        <span className={styles.projectIcon}>✨</span>
        <p>
          Excited to explore this project together! Your insights are valuable
          to ensuring a successful discovery call.
        </p>
      </div>
    </div>
  );

  // ---------- Step 3: Confirmation ----------
  const renderConfirmationStep = () => (
    <div className={styles.confirmationStep}>
      <div className={styles.bookingDetails}>
        <div className={styles.detailItem}>
          <span className={styles.icon}>👤</span>
          <span>{userDetails.name}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.icon}>✉️</span>
          <span>{userDetails.email}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.icon}>📅</span>
          <span>{formatSelectedDate()}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.icon}>🕐</span>
          <span>{selectedTime}</span>
        </div>
      </div>

      <button className={styles.confirmButton}>Confirm</button>

      <div className={styles.reminder}>
        <div className={styles.reminderIcon}>ℹ️</div>
        <div className={styles.reminderContent}>
          <strong>A friendly reminder</strong>
          <p>Please only book if you intend to show up.</p>
        </div>
      </div>

      <div className={styles.projectNote}>
        <span className={styles.projectIcon}>✨</span>
        <p>
          Excited to explore this project together! Your insights are valuable
          to ensuring a successful discovery call.
        </p>
      </div>
    </div>
  );

  // ---------- Calendly Widget Render ----------
  const renderCalendlyWidget = () => (
    <div className={styles.calendlyContainer}>
      <h2 className={styles.title}>Schedule your meeting</h2>
      <InlineWidget
        url="https://calendly.com/jamshaidkhalid?utm_content=5fa51948-ce8e-48c6-81ef-97123531a72f"
        styles={{ height: "630px", width: "100%" }}
      />
    </div>
  );

  // ---------- Render ----------
  return (
    <div className={styles.bookingCalendar}>
      {meetType === "calendly" ? (
        renderCalendlyWidget()
      ) : (
        <>
          {/* Header */}
          <div className={styles.header}>
            {currentStep > 1 && (
              <button className={styles.backButton} onClick={handleBackStep}>
                ← Back
              </button>
            )}

            <div className={styles.steps}>
              <div
                className={`${styles.step} ${
                  currentStep >= 1 ? styles.active : ""
                }`}
              >
                <span className={styles.stepNumber}>1</span>
                <span className={styles.stepLabel}>Select Date & Time</span>
              </div>
              <div
                className={`${styles.step} ${
                  currentStep >= 2 ? styles.active : ""
                }`}
              >
                <span className={styles.stepNumber}>2</span>
                <span className={styles.stepLabel}>Your Details</span>
              </div>
              <div
                className={`${styles.step} ${
                  currentStep >= 3 ? styles.active : ""
                }`}
              >
                <span className={styles.stepNumber}>3</span>
                <span className={styles.stepLabel}>Confirm</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={styles.content}>
            <h2 className={styles.title}>
              {currentStep === 1 && "Schedule your meeting"}
              {currentStep === 2 && "Enter your details"}
              {currentStep === 3 && "Confirm Booking"}
            </h2>

            {currentStep === 1 && renderCalendarStep()}
            {currentStep === 2 && renderDetailsStep()}
            {currentStep === 3 && renderConfirmationStep()}

            {/* Next Button */}
            {currentStep < 3 && (
              <button
                className={styles.nextButton}
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && (!selectedDate || !selectedTime)) ||
                  (currentStep === 2 &&
                    (!userDetails.name || !userDetails.email))
                }
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookingCalendar;
