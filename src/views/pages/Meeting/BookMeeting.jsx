import React, { useEffect, useState } from "react";
import styles from "./BookMeeting.module.scss";
import { getTenantSlots } from "./hooks";

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
        console.error("Failed to fetch tenant slots:", error);
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
      const slotValue = slot; // keep raw UTC string as value
      if (!grouped[dateStr]) grouped[dateStr] = [];
      grouped[dateStr].push({ label: timeStr, value: slotValue });
    });
    setGroupedSlots(grouped);
  };

  const handleSchedule = () => {
    if (!email || !selectedSlot) return alert("Please enter email and select a slot.");
    console.log("📅 Schedule meeting for:", { tenant_id: id, email, slot: selectedSlot });
    alert("Meeting scheduled! (simulate API)");
    // Call scheduleMeeting API here
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
