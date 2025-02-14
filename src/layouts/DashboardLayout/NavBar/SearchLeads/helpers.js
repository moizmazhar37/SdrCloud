// helpers.js
export const headers = [
  { label: "Full Name", key: "full_name" },
  { label: "Email", key: "email" },
  { label: "Address", key: "address" },
  { label: "Location", key: "location" },
  { label: "Domain", key: "domain" },
  { label: "Zip Code", key: "zip_code" },
  { label: "Demographics", key: "demographics" },
  { label: "Family", key: "family" },
  { label: "Financial", key: "financial" },
  { label: "Home", key: "home" },
  { label: "Referral", key: "referral" },
  { label: "Actions", key: "actions" },
];

export const transformData = (leads) => {
  return leads.map((lead) => ({
    full_name: `${lead.first_name || ""} ${lead.last_name || ""}`.trim(),
    email: lead.personal_email || "",
    address: `${lead.contact_address || ""}${
      lead.contact_address_2 ? `, ${lead.contact_address_2}` : ""
    }`.trim(),
    location: `${lead.contact_metro_city || ""}, ${lead.contact_state || ""} ${
      lead.contact_zip || ""
    }${lead.contact_zip4 ? `-${lead.contact_zip4}` : ""}`.trim(),
    domain: lead.host_name || "",
    zip_code: lead.contact_zip || "",
    demographics: `${lead.gender || ""} | Age: ${
      lead.age_range || "N/A"
    }`.trim(),
    family: `${lead.married ? "Married" : "Single"} | Children: ${
      lead.children ? "Yes" : "No"
    }`,
    financial: `Income: ${lead.income_range || "N/A"} | Net Worth: ${
      lead.net_worth || "N/A"
    }`,
    home: lead.homeowner ? "Homeowner" : "Non-Homeowner",
    referral: lead.referrer || "Direct",
    actions: "View Details",
  }));
};
