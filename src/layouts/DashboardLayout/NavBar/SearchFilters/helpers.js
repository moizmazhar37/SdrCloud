export const transformFilters = (filters) => {
  const today = new Date().toISOString().split("T")[0];

  const transformed = {
    startDate: filters.dateRange.start || null,
    endDate: filters.dateRange.end || null,

    firstName: filters.personalCriteria.name?.checked
      ? filters.personalCriteria.name.value.first
      : null,
    lastName: filters.personalCriteria.name?.checked
      ? filters.personalCriteria.name.value.last
      : null,
    email: filters.personalCriteria.email?.checked
      ? filters.personalCriteria.email.value
      : null,
    gender: filters.personalCriteria.gender?.checked
      ? filters.personalCriteria.gender.value
      : null,
    hasChildren: filters.personalCriteria.hasChildren?.checked || null,
    married: filters.personalCriteria.married?.checked || null,

    // Location Criteria
    state: filters.locationCriteria.state?.checked
      ? filters.locationCriteria.state.value
      : null,
    city: filters.locationCriteria.city?.checked
      ? filters.locationCriteria.city.value
      : null,
    zipCode: filters.locationCriteria.zipCode?.checked
      ? filters.locationCriteria.zipCode.value
      : null,

    // Marketing Criteria
    domains: filters.marketingCriteria.domains?.checked
      ? filters.marketingCriteria.domains.value
      : null,
    referralSource: filters.marketingCriteria.referralSource?.checked
      ? filters.marketingCriteria.referralSource.value
      : null,
    keyword: filters.marketingCriteria.keyword?.checked
      ? filters.marketingCriteria.keyword.value
      : null,
    pageViewed: filters.marketingCriteria.pageViewed?.checked
      ? filters.marketingCriteria.pageViewed.value
      : null,

    // Financial Criteria
    netWorth: filters.financialCriteria.netWorth?.checked
      ? filters.financialCriteria.netWorth.value
      : null,
    annualIncome: filters.financialCriteria.income?.checked
      ? filters.financialCriteria.income.value
      : null,
    ownHouse: filters.financialCriteria.ownHouse?.checked || null,
  };

  return transformed;
};

export const resetFiltersState = () => ({
  dateRange: {
    start: "",
    end: "",
  },
  personalCriteria: {
    name: {
      checked: false,
      value: {
        first: "",
        last: "",
      },
    },
    email: {
      checked: false,
      value: "",
    },
    gender: {
      checked: false,
      value: "",
    },
    ageRange: {
      checked: false,
      value: "",
    },
    married: {
      checked: false,
    },
    hasChildren: {
      checked: false,
    },
  },
  locationCriteria: {
    state: {
      checked: false,
      value: "",
    },
    city: {
      checked: false,
      value: "",
    },
    zipCode: {
      checked: false,
      value: "",
    },
  },
  financialCriteria: {
    netWorth: {
      checked: false,
      value: "",
    },
    income: {
      checked: false,
      value: "",
    },
    ownHouse: {
      checked: false,
    },
  },
  marketingCriteria: {
    domains: {
      checked: false,
      value: "",
    },
    referralSource: {
      checked: false,
      value: "",
    },
    keyword: {
      checked: false,
      value: "",
    },
    pageViewed: {
      checked: false,
      value: "",
    },
  },
});
