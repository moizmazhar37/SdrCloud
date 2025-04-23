import React, { useEffect, useState } from "react";
import styles from "./BookMeeting.module.scss";
import { getTenantSlots, scheduleMeeting } from "./hooks";
import { toast } from "react-toastify";

const BookMeetingPage = () => {
  const id = window.location.href.split("/").pop().trim();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groupedSlots, setGroupedSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTenantSlots(id);
        setTenant(res);
        groupSlotsByDate(res.slots);
      } catch (error) {
        toast.error("Failed to load slots");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const groupSlotsByDate = (slots) => {
    const grouped = {};
    slots.forEach((slot) => {
      const local = new Date(slot);
      const dateStr = local.toLocaleDateString();
      const timeStr = local.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      if (!grouped[dateStr]) grouped[dateStr] = [];
      grouped[dateStr].push({ label: timeStr, value: slot }); // keep UTC in value
    });
    setGroupedSlots(grouped);
  };

  const handleSchedule = async () => {
    if (!email || !selectedSlot) {
      toast.warn("Please enter your email and select a time slot.");
      return;
    }

    const payload = {
      tenant_id: id,
      email,
      start_time_utc: selectedSlot,
      summary: "Meeting",
      description: "Scheduled via platform",
    };

    try {
      const res = await scheduleMeeting(payload);
      toast.success("Meeting scheduled successfully!");
      toast.info(`Join link: ${res.hangoutLink}`, { autoClose: 6000 });
    } catch (error) {
      console.error("Schedule error:", error);
      toast.error("Failed to schedule meeting.");
    }
  };

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading calendar...</p>
      </div>
    );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {tenant && (
          <>
            <div className={styles.header}>
              <div className={styles.logoWrapper}>
                <img
                  src={tenant.logo}
                  alt="Tenant Logo"
                  className={styles.logo}
                />
              </div>
              <h1 className={styles.title}>{tenant.name}'s Calendar</h1>
            </div>

            <div className={styles.calendarSection}>
              <h3 className={styles.sectionTitle}>Select a time slot</h3>

              <div className={styles.slots}>
                {Object.keys(groupedSlots).map((date) => (
                  <div key={date} className={styles.slotGroup}>
                    <div className={styles.dateHeader}>
                      <h4>{date}</h4>
                    </div>
                    <div className={styles.slotsList}>
                      {groupedSlots[date].map((slot, idx) => (
                        <div
                          key={idx}
                          className={`${styles.slotItem} ${
                            selectedSlot === slot.value ? styles.selected : ""
                          }`}
                          onClick={() => setSelectedSlot(slot.value)}
                        >
                          <input
                            type="radio"
                            id={`${date}-${idx}`}
                            name="slot"
                            value={slot.value}
                            checked={selectedSlot === slot.value}
                            onChange={() => {}}
                          />
                          <label htmlFor={`${date}-${idx}`}>{slot.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.form}>
              <h3 className={styles.sectionTitle}>Your information</h3>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className={styles.emailInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                className={styles.scheduleBtn}
                onClick={handleSchedule}
                disabled={!selectedSlot || !email}
              >
                Schedule Meeting
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookMeetingPage;
