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
