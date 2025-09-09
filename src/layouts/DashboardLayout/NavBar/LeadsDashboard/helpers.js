export const handlePieChartSegmentClick = (
  chartTitle,
  segmentName,
  setShowSearchLeads,
  setSearchFilters
) => {
  let filterKey = "";
  let filterValue = segmentName;

  switch (chartTitle) {
    case "Gender":
      filterKey = "gender";
      break;
    case "Direct Vs. Referral":
      filterKey = "referralSource";
      break;
    default:
      return;
  }

  setSearchFilters({ [filterKey]: filterValue });
  setShowSearchLeads(true);
};

export const handleViewAllVisitors = (setShowSearchLeads, setSearchFilters) => {
  setSearchFilters(null);
  setShowSearchLeads(true);
};

export const handleBarChartRowClick = (
  chartType,
  rowLabel,
  setShowSearchLeads,
  setSearchFilters
) => {
  let filterKey = "";
  let filterValue = rowLabel;

  if (chartType === "income" && typeof rowLabel === "string") {
    filterValue = rowLabel.replace(/(\$[0-9]*),([0-9]*)/g, "$1$2");
  }

  switch (chartType) {
    case "income":
      filterKey = "netWorth";
      break;
    case "age":
      filterKey = "age";
      break;
    case "location":
      filterKey = "state";
      break;
    default:
      return;
  }

  setSearchFilters({ [filterKey]: filterValue });
  setShowSearchLeads(true);
};

export const getCurrentMonthDateRange = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

  // Format dates as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    startDate: formatDate(firstDay),
    endDate: formatDate(today),
  };
};

export const EMPTY_RESPONSE = {
identified_by_month: {
    identified: 0,
    percentage: 100,
    previousPeriod: 0,
    budgetedIdentifications: 300,
  },
  monthly_spend: {
    spend: 0,
    percentage: null,
    budget: 0,
  },
  visitors: [],
  direct_vs_referral: {
    Direct: 0,
    Referral: 0,
  },
  visitor_trends: [],
  income_data: [],
  age_data: [],
  location_data: [],
  gender_data: {
    Male: 0,
    Female: 0,
  },
};