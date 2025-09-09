// hooks.js
import { url } from "src/config/APIConfig";

export const getTenantSlots = async (tenantId) => {
  const res = await fetch(`${url}/tenant-meeting/tenant-slots/${tenantId}`);
  if (!res.ok) throw new Error("Failed to fetch slots");
  return await res.json();
};

export const scheduleMeeting = async (data) => {
  const res = await fetch(`${url}/tenant-meeting/create-meeting`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to schedule meeting.");
  }

  return await res.json();
};
