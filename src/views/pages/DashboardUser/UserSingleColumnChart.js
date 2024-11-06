import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const UserSingleColumnChart = () => {
  const [chartOptions] = useState({
    chart: {
      type: "bar",
      height: 300,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        columnWidth: "12px",
        endingShape: "rounded",
        colors: {
          ranges: [
            { from: 0, to: 0, color: "#CACACA" },
            { from: 1, to: 1, color: "#0358AC" },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Mar", "Apr", "May", "Jun"],
    },
    yaxis: {
      tickAmount: 4,
      max: 8000,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => "$ " + val + " thousands",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: 10,
    },
  });

  const [chartSeries] = useState([
    {
      name: "Total Active Media",
      data: [3000, 5097, 4007, 4056],
      color: "#0358AC",
    },
    { name: "Total Views", data: [1542, 2560, 2556, 3245], color: "#CACACA" },
  ]);

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height={300}
    />
  );
};

export default UserSingleColumnChart;
