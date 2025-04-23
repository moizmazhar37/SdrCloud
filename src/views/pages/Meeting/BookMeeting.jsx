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
      const timeStr = local.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.container}>
      {tenant && (
        <>
          <div className={styles.header}>
            <img src={tenant.logo} alt="Tenant Logo" className={styles.logo} />
            <h2>{tenant.name}'s Calendar</h2>
          </div>

          <div className={styles.slots}>
            {Object.keys(groupedSlots).map((date) => (
              <div key={date} className={styles.slotGroup}>
                <h4>{date}</h4>
                {groupedSlots[date].map((slot, idx) => (
                  <div key={idx} className={styles.slotItem}>
                    <input
                      type="radio"
                      id={`${date}-${idx}`}
                      name="slot"
                      value={slot.value}
                      checked={selectedSlot === slot.value}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                    />
                    <label htmlFor={`${date}-${idx}`}>{slot.label}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.emailInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={styles.scheduleBtn} onClick={handleSchedule}>
              Schedule Meeting
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookMeetingPage;
