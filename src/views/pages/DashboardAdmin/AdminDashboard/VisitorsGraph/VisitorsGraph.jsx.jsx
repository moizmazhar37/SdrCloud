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
  // const data = [
  //   {
  //     name: "Mar",
  //     visitors: 5,
  //     website: "bloxbunny.com",
  //   },
  //   {
  //     name: "Feb",
  //     visitors: 3,
  //     website: "bloxbunny.com",
  //   },
  //   {
  //     name: "Mar",
  //     visitors: 7,
  //     website: "techco.io",
  //   },
  //   {
  //     name: "Feb",
  //     visitors: 4,
  //     website: "techco.io",
  //   },
  //   {
  //     name: "Mar",
  //     visitors: 8,
  //     website: "example.com",
  //   },
  //   {
  //     name: "Feb",
  //     visitors: 6,
  //     website: "example.com",
  //   },
  // ];

  const [filteredData, setFilteredData] = useState(data);
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  // Extract unique websites from data
  const uniqueWebsites = [...new Set(data.map((item) => item.website))];

  // Create options in the required format
  const websiteOptions = uniqueWebsites.map((website) => ({
    label: website,
  }));

  // Add "All Websites" option
  const allOptions = [{ label: "All Websites" }, ...websiteOptions];

  // Handle website selection
  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website);

    // Filter data by selected website
    if (website && website !== "All Websites") {
      const filtered = data.filter((item) => item.website === website);
      setFilteredData(filtered);
    } else {
      // Show all data when "All Websites" is selected or no selection
      setFilteredData(data);
    }
  };

  // Set all data initially
  useEffect(() => {
    // Initially show all data
    setFilteredData(data);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          <p className={styles.tooltipItem} style={{ color: "#0D3B66" }}>
            Visitors: {payload[0].value.toLocaleString()}
          </p>
          {(!selectedWebsite || selectedWebsite === "All Websites") && (
            <p className={styles.tooltipItem} style={{ color: "#6B7280" }}>
              Website: {payload[0].payload.website}
            </p>
          )}
        </div>
      );
    }
    return null;
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
      <div className={styles.graphContainer}>
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
              domain={[0, "dataMax + 2"]}
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
