// helpers.js
export const headers = [
  { label: "Full Name", key: "full_name" },
  { label: "Email", key: "email" },
  { label: "Address", key: "address" },
  { label: "Location", key: "location" },
  { label: "Demographics", key: "demographics" },
  { label: "Financial", key: "financial" },
  { label: "Actions", key: "actions" },
];

export const transformData = (leads) => {
  return leads.map((lead) => ({
    full_name: `${lead.first_name} ${lead.last_name}`,
    email: lead.personal_email,
    address: `${lead.contact_address}${
      lead.contact_address_2 ? `, ${lead.contact_address_2}` : ""
    }`,
    location: `${lead.contact_metro_city}, ${lead.contact_state} ${
      lead.contact_zip
    }${lead.contact_zip4 ? `-${lead.contact_zip4}` : ""}`,
    demographics: `${lead.gender} | Age: ${lead.age_range}`,
    financial: `Income: ${lead.income_range} | Net Worth: ${lead.net_worth}`,
    actions: "View Details",
  }));
};
