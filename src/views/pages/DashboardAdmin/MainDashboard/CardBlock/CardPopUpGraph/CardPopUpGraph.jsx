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
import Loader from "src/Common/Loader/Loader"; // Import the Loader component
import styles from "./CardPopUpGraph.module.scss";

const CardPopUpGraph = ({
  onClose,
  isOpen,
  heading,
  graphData,
  loading,
  error,
}) => {
  const popupRef = useRef(null);

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
              {loading ? (
                <div className={styles.loaderContainer}>
                  <Loader size={60} />{" "}
                  {/* Using the same Loader component as in AdminDashboard */}
                </div>
              ) : error ? (
                <div className={styles.errorContainer}>
                  <p className={styles.errorText}>
                    Error loading data. Please try again.
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={graphData}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPopUpGraph;
