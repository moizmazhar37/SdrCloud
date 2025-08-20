import React, { useState } from "react";
import "./BookingCalendar.css";

const BookingCalendar = ({ 
  currentStep, 
  bookingData, 
  setBookingData, 
  onNext, 
  onBack, 
  onConfirm 
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay();
    
    const days = [];
    
    // Previous month's trailing days
    for (let i = 0; i < firstDayWeekday; i++) {
      const day = new Date(currentYear, currentMonth, -firstDayWeekday + i + 1);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    // Current month days
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(currentYear, currentMonth, day);
      days.push({ date: date, isCurrentMonth: true });
    }
    
    // Next month's leading days
    const remainingCells = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(currentYear, currentMonth + 1, day);
      days.push({ date: date, isCurrentMonth: false });
    }
    
    return days;
  };

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  const today = new Date();
  const currentMonth = monthNames[today.getMonth()];
  const currentYear = today.getFullYear();
  const calendarDays = generateCalendarDays();

  const handleDateSelect = (date) => {
    if (date.isCurrentMonth && date.date >= new Date().setHours(0, 0, 0, 0)) {
      setSelectedDate(date.date);
      setBookingData({ ...bookingData, selectedDate: date.date });
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setBookingData({ ...bookingData, selectedTime: time });
  };

  const handleInputChange = (field, value) => {
    setBookingData({ ...bookingData, [field]: value });
  };

  const formatSelectedDate = (date) => {
    if (!date) return "";
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  if (currentStep === 1) {
    return (
      <div className="booking-calendar">
        <div className="step-indicator">
          <div className="step active">
            <div className="step-number">1</div>
            <div className="step-label">Select Date & Time</div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-label">Your Details</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-label">Confirm</div>
          </div>
        </div>

        <div className="calendar-section">
          <h2 className="calendar-title">Schedule your meeting</h2>
          
          <div className="calendar-header">
            <button className="nav-button">&lt;</button>
            <span className="month-year">{currentMonth} {currentYear}</span>
            <button className="nav-button">&gt;</button>
          </div>

          <div className="calendar-grid">
            <div className="weekdays">
              {weekDays.map((day) => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            
            <div className="calendar-days">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  className={`calendar-day ${
                    !day.isCurrentMonth ? 'other-month' : ''
                  } ${
                    day.date.toDateString() === new Date().toDateString() ? 'today' : ''
                  } ${
                    selectedDate && selectedDate.toDateString() === day.date.toDateString() 
                      ? 'selected' : ''
                  }`}
                  onClick={() => handleDateSelect(day)}
                  disabled={!day.isCurrentMonth || day.date < new Date().setHours(0, 0, 0, 0)}
                >
                  {day.date.getDate()}
                </button>
              ))}
            </div>
          </div>

          <div className="timezone-info">
            🌍 Asia/Karachi
          </div>

          <div className="time-slots">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>

          <button 
            className="next-button"
            onClick={onNext}
            disabled={!selectedDate || !selectedTime}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="booking-calendar">
        <div className="step-indicator">
          <div className="step completed">
            <div className="step-number">✓</div>
            <div className="step-label">Select Date & Time</div>
          </div>
          <div className="step active">
            <div className="step-number">2</div>
            <div className="step-label">Your Details</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-label">Confirm</div>
          </div>
        </div>

        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <div className="details-section">
          <h2 className="details-title">Your Details</h2>
          
          <div className="form-group">
            <label>Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Enter your name"
                value={bookingData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={bookingData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>

          <button 
            className="next-button"
            onClick={onNext}
            disabled={!bookingData.name || !bookingData.email}
          >
            Next
          </button>

          <div className="reminder-section">
            <div className="reminder-icon">⏰</div>
            <div className="reminder-content">
              <strong>A friendly reminder</strong>
              <p>Please only book if you intend to show up.</p>
            </div>
          </div>

          <div className="project-info">
            <span className="star-icon">⭐</span>
            <p>Excited to explore this project together! Your insights are valuable to ensuring a successful discovery call.</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="booking-calendar">
        <div className="step-indicator">
          <div className="step completed">
            <div className="step-number">✓</div>
            <div className="step-label">Select Date & Time</div>
          </div>
          <div className="step completed">
            <div className="step-number">✓</div>
            <div className="step-label">Your Details</div>
          </div>
          <div className="step active">
            <div className="step-number">3</div>
            <div className="step-label">Confirm</div>
          </div>
        </div>

        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <div className="confirm-section">
          <h2 className="confirm-title">Confirm Booking</h2>
          
          <div className="booking-summary">
            <div className="summary-item">
              <span className="summary-icon">👤</span>
              <span className="summary-text">{bookingData.name}</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-icon">✉️</span>
              <span className="summary-text">{bookingData.email}</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-icon">📅</span>
              <span className="summary-text">{formatSelectedDate(bookingData.selectedDate)}</span>
            </div>
            
            <div className="summary-item">
              <span className="summary-icon">🕒</span>
              <span className="summary-text">{bookingData.selectedTime}</span>
            </div>
          </div>

          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>

          <div className="reminder-section">
            <div className="reminder-icon">⏰</div>
            <div className="reminder-content">
              <strong>A friendly reminder</strong>
              <p>Please only book if you intend to show up.</p>
            </div>
          </div>

          <div className="project-info">
            <span className="star-icon">⭐</span>
            <p>Excited to explore this project together! Your insights are valuable to ensuring a successful discovery call.</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BookingCalendar;