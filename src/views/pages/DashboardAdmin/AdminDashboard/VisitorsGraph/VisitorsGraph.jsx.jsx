import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import FiltersDropdown from "./FIltersDropdown/FiltersDropdown";
import styles from "./VisitorsGraph.module.scss";

// Define color palette for different websites
const COLORS = [
  "#1D4ED8", // Blue (1st website)
  "#F97316", // Orange (2nd website)
  "#4CAF50", // Green (3rd website)
  "#9333EA", // Purple (4th website)
  "#F95738", // Orange-red
  "#1D7874", // Teal
  "#8C5383", // Mauve
  "#F2C14E", // Yellow
  "#EF476F", // Pink
  "#06D6A0", // Light green
  "#118AB2", // Sky blue
  "#073B4C", // Deep navy
  "#FFD166", // Light yellow
];

const VisitorsGraph = ({ data }) => {
  const [formattedData, setFormattedData] = useState([]);
  const [selectedWebsite, setSelectedWebsite] = useState("All Websites");
  const [websiteColorMap, setWebsiteColorMap] = useState({});
  const [uniqueWebsites, setUniqueWebsites] = useState([]);

  // Process the new data structure
  useEffect(() => {
    if (!data || data.length === 0) {
      setFormattedData([]);
      setUniqueWebsites([]);
      return;
    }

    // Extract all unique websites from the data
    const websites = new Set();
    data.forEach((monthData) => {
      if (monthData.values && monthData.values.length > 0) {
        monthData.values.forEach((item) => {
          if (item.website) {
            websites.add(item.website);
          }
        });
      }
    });

    const websiteList = Array.from(websites);
    setUniqueWebsites(websiteList);

    // Create color mapping for each website
    const colorMapping = {};
    websiteList.forEach((website, index) => {
      colorMapping[website] = COLORS[index % COLORS.length];
    });
    setWebsiteColorMap(colorMapping);

    // Format data for the chart
    const formatted = data.map((monthData) => {
      const result = { name: monthData.name };

      // Initialize with 0 for all websites
      websiteList.forEach((website) => {
        result[website] = 0;
      });

      // Add actual values
      if (monthData.values && monthData.values.length > 0) {
        monthData.values.forEach((item) => {
          if (item.website && item.visitors !== undefined) {
            result[item.website] = item.visitors;
          }
        });
      }

      return result;
    });

    setFormattedData(formatted);
  }, [data]);

  // Handle website selection
  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website);
  };

  // Create options for the dropdown
  const websiteOptions = [
    { label: "All Websites" },
    ...uniqueWebsites.map((website) => ({ label: website })),
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          {payload.map((entry, index) => (
            <p
              key={`item-${index}`}
              className={styles.tooltipItem}
              style={{ color: entry.color }}
            >
              {`${entry.name} : ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Show a message when there's no data
  const NoDataMessage = () => {
    if (data && data.length > 0 && uniqueWebsites.length > 0) return null;

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

  // Calculate the maximum value for Y axis domain
  const calculateYAxisMax = () => {
    if (!formattedData || formattedData.length === 0) return 5;

    let max = 0;
    formattedData.forEach((item) => {
      uniqueWebsites.forEach((website) => {
        if (item[website] > max) {
          max = item[website];
        }
      });
    });

    return max + Math.ceil(max * 0.2); // Add 20% padding
  };

  return (
    <div className={styles.graphCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>Visitors Graph</h2>
        <FiltersDropdown
          options={websiteOptions}
          type="Dropdown"
          onOptionSelect={handleWebsiteSelect}
        />
      </div>
      <div className={styles.graphContainer} style={{ position: "relative" }}>
        <NoDataMessage />
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={formattedData}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: formattedData.length > 5 ? 50 : 20,
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
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
              interval={0}
              angle={formattedData.length > 5 ? -45 : 0}
              textAnchor={formattedData.length > 5 ? "end" : "middle"}
              height={formattedData.length > 5 ? 60 : 30}
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
              domain={[0, calculateYAxisMax()]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
            />
            {selectedWebsite !== "All Websites" && (
              <Legend wrapperStyle={{ paddingTop: 10 }} />
            )}

            {/* Render areas for each website based on selection */}
            {uniqueWebsites.map((website, index) => {
              // If a specific website is selected, only show that one
              if (
                selectedWebsite !== "All Websites" &&
                selectedWebsite !== website
              ) {
                return null;
              }

              // Generate a lighter fill color for the area
              const color = websiteColorMap[website];
              // Create a semi-transparent version of the color for fill
              const fillColor = color + "40"; // 40 is 25% opacity in hex

              return (
                <Area
                  key={website}
                  type="monotone"
                  dataKey={website}
                  name={website}
                  stroke={color}
                  fill={fillColor}
                  strokeWidth={2}
                  dot={{ fill: color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisitorsGraph;
