// helpers.js

// Utility function to round numbers and format as currency
export const roundNumber = (num, decimals = 2) => {
    if (num === undefined || num === null) return "$0.00";
    const factor = Math.pow(10, decimals);
    const rounded = (Math.round(num * factor) / factor).toFixed(decimals);
    return `$${rounded}`;
  };
  
  // Graph dropdown options
  export const dropdownOptionsForGraph = [
    {
      label: "Monthly",
      onClick: (setSelectedGraphTimeStamp, setGraphTimePeriod) => {
        setSelectedGraphTimeStamp("Monthly");
        setGraphTimePeriod("month");
      },
    },
    {
      label: "Yearly",
      onClick: (setSelectedGraphTimeStamp, setGraphTimePeriod) => {
        setSelectedGraphTimeStamp("Yearly");
        setGraphTimePeriod("year");
      },
    },
    {
      label: "Weekly",
      onClick: (setSelectedGraphTimeStamp, setGraphTimePeriod) => {
        setSelectedGraphTimeStamp("Weekly");
        setGraphTimePeriod("week");
      },
    },
  ];
  
  // HVO Video graph dropdown options
  export const dropdownOptionsHvoVideoGraph = [
    {
      label: "Monthly",
      onClick: (setSelectedSentHvoVideoTimestamp, setHvoVideoTimeframe) => {
        setSelectedSentHvoVideoTimestamp("Monthly");
        setHvoVideoTimeframe("month");
      },
    },
    {
      label: "Yearly",
      onClick: (setSelectedSentHvoVideoTimestamp, setHvoVideoTimeframe) => {
        setSelectedSentHvoVideoTimestamp("Yearly");
        setHvoVideoTimeframe("year");
      },
    },
    {
      label: "Weekly",
      onClick: (setSelectedSentHvoVideoTimestamp, setHvoVideoTimeframe) => {
        setSelectedSentHvoVideoTimestamp("Weekly");
        setHvoVideoTimeframe("week");
      },
    },
  ];
  
  // User dropdown options
  export const dropdownOptionsForUser = [
    {
      label: "Current Month",
      onClick: (setSelectedTimeStamp, setUserTimePeriod) => {
        setSelectedTimeStamp("Current Month");
        setUserTimePeriod("month");
      },
    },
    {
      label: "Current Year",
      onClick: (setSelectedTimeStamp, setUserTimePeriod) => {
        setSelectedTimeStamp("Current Year");
        setUserTimePeriod("year");
      },
    },
    {
      label: "Current Week",
      onClick: (setSelectedTimeStamp, setUserTimePeriod) => {
        setSelectedTimeStamp("Current Week");
        setUserTimePeriod("week");
      },
    },
  ];
  
  // Template dropdown options
  export const dropdownOptionsForTemplate = [
    {
      label: "Current Month",
      onClick: (setSelectedTimeStampForTemplate, setTemplateTimePeriod) => {
        setSelectedTimeStampForTemplate("Current Month");
        setTemplateTimePeriod("month");
      },
    },
    {
      label: "Current Year",
      onClick: (setSelectedTimeStampForTemplate, setTemplateTimePeriod) => {
        setSelectedTimeStampForTemplate("Yearly");
        setTemplateTimePeriod("year");
      },
    },
    {
      label: "Current Week",
      onClick: (setSelectedTimeStampForTemplate, setTemplateTimePeriod) => {
        setSelectedTimeStampForTemplate("Weekly");
        setTemplateTimePeriod("week");
      },
    },
  ];
  
  // Table headers configuration
  export const tableHeaders = [
    { key: "name", label: "Name" },
    { key: "credits", label: "Credits used" },
    { key: "score", label: "Score" },
  ];
  
  export const tableHeaders2 = [
    { key: "template_name", label: "Name" },
    { key: "template_type", label: "Type" },
    { key: "viewed_count", label: "Times Used" },
  ];
  