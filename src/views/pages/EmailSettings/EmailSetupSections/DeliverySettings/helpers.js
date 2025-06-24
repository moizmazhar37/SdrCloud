// Helper functions for DeliverySettings component

export const extractTime = (timeString) => {
  if (!timeString) return "08:00";
  return timeString.split(":").slice(0, 2).join(":");
};

export const initializeDeliveryData = (initialData) => {
  if (!initialData) return null;

  const hasWeekdaysTime = initialData.weekdays_time;
  const hasWeekendTime = initialData.weekend_time;

  const types = [];
  if (initialData.email_enabled) types.push("Email");
  if (initialData.sms_enabled) types.push("SMS");

  return {
    deliveryTypes: types.length > 0 ? types : ["Email"],
    maxReminders: String(initialData.max_reminders || 5),
    scheduleType: "Recurring", // Default as this isn't stored in API
    weekdaysEnabled: !!hasWeekdaysTime,
    weekendsEnabled: !!hasWeekendTime,
    weekdaysTimes: hasWeekdaysTime
      ? {
          start: extractTime(initialData.weekdays_time),
          end: extractTime(initialData.weekdays_time),
        }
      : { start: "08:00", end: "08:00" },
    weekendsTimes: hasWeekendTime
      ? {
          start: extractTime(initialData.weekend_time),
          end: extractTime(initialData.weekend_time),
        }
      : { start: "08:00", end: "08:00" },
  };
};

export const toggleDeliveryType = (currentTypes, type) => {
  if (currentTypes.includes(type)) {
    return currentTypes.filter((t) => t !== type);
  } else {
    return [...currentTypes, type];
  }
};

export const removeDeliveryType = (currentTypes, type) => {
  return currentTypes.filter((t) => t !== type);
};

export const updateTimeForDayType = (currentTimes, timeType, value) => {
  return { ...currentTimes, [timeType]: value };
};

export const prepareSettingsForSave = (
  maxReminders,
  weekdaysEnabled,
  weekendsEnabled,
  weekdaysTimes,
  weekendsTimes,
  scheduleType,
  scheduledDate,
  scheduledTime
) => {
  // Convert date and time to UTC format
  const convertToUTC = (date, time) => {
    if (!date || !time) return null;
    const localDateTime = new Date(`${date}T${time}`);
    return localDateTime.toISOString();
  };

  const weekdaysTime = weekdaysEnabled ? weekdaysTimes.start : null;
  const weekendTime = weekendsEnabled ? weekendsTimes.start : null;

  const settings = {
    maxReminders,
    weekdaysTime,
    weekendTime,
  };

  if (scheduledDate && scheduledTime) {
    console.log("asjfbjsakbsa");
    settings.start_date = convertToUTC(scheduledDate, scheduledTime);
  }

  return settings;
};

export const createDataChangePayload = (
  deliveryTypes,
  maxReminders,
  scheduleType,
  weekdaysEnabled,
  weekendsEnabled,
  weekdaysTimes,
  weekendsTimes,
  newData = {}
) => {
  return {
    deliveryTypes,
    maxReminders,
    scheduleType,
    weekdaysEnabled,
    weekendsEnabled,
    weekdaysTimes,
    weekendsTimes,
    ...newData,
  };
};
