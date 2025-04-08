import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./CardPopUpGraph.module.scss";

const CardPopUpGraph = ({ onClose, isOpen, heading }) => {
  const popupRef = useRef(null);

  // Sample data that matches the graph in the image
  const data = [
    { name: "Jan", value: 1500 },
    { name: "Feb", value: 4700 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 1950 },
    { name: "May", value: 800 },
    { name: "Jun", value: 1200 },
    { name: "Jul", value: 5000 },
  ];

  // Handle click outside to close the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          <p className={styles.tooltipItem} style={{ color: "#0D3B66" }}>
            value: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer} ref={popupRef}>
        <div className={styles.popupHeader}>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        <div className={styles.popupContent}>
          <div className={styles.graphCard}>
            <div className={styles.header}>
              <h2 className={styles.title}>{heading}</h2>
            </div>
            <div className={styles.graphContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={data}
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
                    domain={["dataMin", "dataMax"]}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    name="value"
                    stroke="#0D3B66"
                    fill="#D1E3F8"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPopUpGraph;
