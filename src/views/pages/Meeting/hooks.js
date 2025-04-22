import axios from "axios";

export const getTenantSlots = async (tenantId) => {
  const response = await axios.get(`http://localhost:8000/tenant-meeting/tenant-slots/${tenantId}`, {
    params: {
      tenant_id: tenantId,
    },
  });
  return response.data;
};
