import React from "react";
import ReactApexChart from "react-apexcharts";

const UserGroupBarGraph = () => {
  const options = {
    chart: {
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        endingShape: "rounded",
        borderRadius: 10,
        dataLabels: {
          position: "top",
          color: "#152F40",
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: true,
      position: "top",
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#152F40"],
      },
    },
    xaxis: {
      categories: ["Videos", "HVO Pages"],
      labels: {
        style: {
          colors: "#858585",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
    legend: {
      show: false,
    },
  };

  const series = [
    { name: "Videos", data: [44, 55], color: "#0358AC" },
    { name: "HVO Pages", data: [30, 40], color: "#7DC371" },
  ];

  return (
    <ReactApexChart options={options} series={series} type="bar" height={180} />
  );
};

export default UserGroupBarGraph;
