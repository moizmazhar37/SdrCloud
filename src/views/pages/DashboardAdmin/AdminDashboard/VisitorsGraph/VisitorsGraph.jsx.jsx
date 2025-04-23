import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import FiltersDropdown from "./FIltersDropdown/FiltersDropdown";
import styles from "./VisitorsGraph.module.scss";

const VisitorsGraph = ({ data }) => {
  // Function to get default empty data with all months
  const getDefaultData = () => {
    if (data && data.length > 0) return data;

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months.map((month) => ({
      name: month,
      visitors: 0,
      website: "-",
    }));
  };

  const [filteredData, setFilteredData] = useState([]);
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  // Extract unique websites from data (if data exists)
  const uniqueWebsites =
    data && data.length > 0
      ? [...new Set(data.map((item) => item.website))]
      : [];

  // Create options in the required format
  const websiteOptions = uniqueWebsites.map((website) => ({
    label: website,
  }));

  // Add "All Websites" option
  const allOptions = [{ label: "All Websites" }, ...websiteOptions];

  // Handle website selection
  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website);

    // Get the base data (either actual data or default empty data)
    const baseData = getDefaultData();

    // Filter data by selected website
    if (website && website !== "All Websites" && data.length > 0) {
      const filtered = baseData.filter((item) => item.website === website);
      setFilteredData(filtered.length > 0 ? filtered : getDefaultData());
    } else {
      // Show all data when "All Websites" is selected or no selection
      setFilteredData(baseData);
    }
  };

  // Set all data initially
  useEffect(() => {
    // Initially show all data or default empty data
    setFilteredData(getDefaultData());
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          <p className={styles.tooltipItem} style={{ color: "#0D3B66" }}>
            Visitors: {payload[0].value.toLocaleString()}
          </p>
          {(!selectedWebsite || selectedWebsite === "All Websites") &&
            payload[0].payload.website !== "-" && (
              <p className={styles.tooltipItem} style={{ color: "#6B7280" }}>
                Website: {payload[0].payload.website}
              </p>
            )}
        </div>
      );
    }
    return null;
  };

  // Show a message when there's no data
  const NoDataMessage = () => {
    if (data && data.length > 0) return null;

    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "14px",
          color: "#6B7280",
          zIndex: 1,
        }}
      >
        No data available
      </div>
    );
  };

  return (
    <div className={styles.graphCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>Visitors Graph</h2>
        <FiltersDropdown
          options={allOptions}
          type="Dropdown"
          onOptionSelect={handleWebsiteSelect}
        />
      </div>
      <div className={styles.graphContainer} style={{ position: "relative" }}>
        <NoDataMessage />
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={filteredData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 14 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 14 }}
              dx={-10}
              tickFormatter={(value) =>
                value === 0 ? "0" : value.toLocaleString()
              }
              allowDataOverflow={false}
              allowDecimals={false}
              domain={[0, data && data.length > 0 ? "dataMax + 2" : 5]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              name="Visitors"
              stroke="#0D3B66"
              fill="#D1E3F8"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisitorsGraph;
