export const transformFilters = (filters) => {
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
    age: filters.personalCriteria.ageRange?.checked
      ? filters.personalCriteria.ageRange.value
      : null,
    hasChildren: filters.personalCriteria.hasChildren?.checked
      ? filters.personalCriteria.hasChildren.value
      : null, // Fixed hasChildren handling
    married: filters.personalCriteria.married?.checked
      ? filters.personalCriteria.married.value
      : null, // Fixed married handlingf

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
    ownHouse: filters.financialCriteria.ownHouse?.checked
      ? filters.financialCriteria.ownHouse.value
      : null, // Fixed ownHouse handling
  };

  return transformed;
};

export const resetFiltersState = () => ({
  dateRange: {
    start: null,
    end: null,
  },
  personalCriteria: {
    name: {
      checked: false,
      value: {
        first: null,
        last: null,
      },
    },
    email: {
      checked: false,
      value: null,
    },
    gender: {
      checked: false,
      value: null,
    },
    ageRange: {
      checked: false,
      value: null,
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
      value: null,
    },
    city: {
      checked: false,
      value: null,
    },
    zipCode: {
      checked: false,
      value: null,
    },
  },
  financialCriteria: {
    netWorth: {
      checked: false,
      value: null,
    },
    income: {
      checked: false,
      value: null,
    },
    ownHouse: {
      checked: false,
    },
  },
  marketingCriteria: {
    domains: {
      checked: false,
      value: null,
    },
    referralSource: {
      checked: false,
      value: null,
    },
    keyword: {
      checked: false,
      value: null,
    },
    pageViewed: {
      checked: false,
      value: null,
    },
  },
});
