import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";

// Helper function to generate day-wise time series data from current date to the last 30 days
const generateDayWiseTimeSeries = (count, yrange) => {
  let i = 0;
  const series = [];
  let baseval = new Date().getTime(); // Start from current date
  while (i < count) {
    const x = baseval;
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({ x, y });
    baseval -= 86400000; // Decrement the base value by one day (in milliseconds)
    i++;
  }
  return series;
};

// UserGroupAreaGraph component definition
const UserGroupAreaGraph = () => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const newSeries = [
      {
        name: "Data",
        data: generateDayWiseTimeSeries(30, { min: 10, max: 60 }),
      },
    ];

    const newOptions = {
      chart: {
        type: "area",
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min));
          },
        },
      },
      colors: ["rgb(3, 88, 172)"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 0,
      },
      fill: {
        type: "solid",
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      xaxis: {
        type: "datetime",
        labels: {
          formatter: function (value) {
            const date = new Date(value);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          },
        },
        title: {
          text: "Total:",
          style: {
            color: "#858585",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        title: {
          text: "Views",
          style: {
            color: "#858585",
            fontWeight: 400,
          },
        },
        categories: [0, 50, 100, 150, 200],
      },
    };

    setOptions(newOptions);
    setSeries(newSeries);
  }, []);

  // Rendering the area graph component
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
};

export default UserGroupAreaGraph;
