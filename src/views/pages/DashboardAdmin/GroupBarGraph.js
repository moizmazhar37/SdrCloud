import React from "react";
import ReactApexChart from "react-apexcharts";
import { makeStyles } from "@material-ui/core/styles";

// Styles for the component
const useStyles = makeStyles(() => ({
  chart: {
    "& .apexcharts-text tspan": {
      fontSize: "14px",
      fontWeight: 400,
    },
  },
}));

const GroupBarGraph = () => {
  const classes = useStyles();

  const options = {
    series: [
      { name: "Videos", data: [44, 45], color: "#0358AC" },
      { name: "HVO Pages", data: [30, 40], color: "#7DC371" },
    ],
    chart: {
      type: "bar",
      height: 220,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 10, // Only borderRadius to avoid conflicts
        dataLabels: {
          position: "center",
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
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -10,
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
    yaxis: {
      labels: {
        style: {
          colors: "#858585",
        },
      },
      tickAmount: 5,
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

  return (
    <div id="chart" className={classes.chart}>
      <ReactApexChart
        options={options}
        series={options.series}
        type="bar"
        height={220}
      />
    </div>
  );
};

export default GroupBarGraph;
