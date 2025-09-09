import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ReactApexChart from "react-apexcharts";
// Styles for the component
const useStyles = makeStyles(() => ({
  chart: {
    "& .apexcharts-menu-icon, .apexcharts-reset-icon, .apexcharts-zoom-icon": {
      display: "none",
    },
    "& .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center, .apexcharts-legend.apx-legend-position-top.apexcharts-align-center":
      {
        display: "none",
      },
    "& .apexcharts-text tspan": {
      fontSize: "14px",
      fontWeight: 400,
    },
  },
}));
// Renders a single bar graph component for displaying user data over time
const UserSingleBarGraph = () => {
  const classes = useStyles();
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [2000, 55, 490, 306, 1537, 1080],
        color: "#0358AC",
      },
      {
        data: [76, 1055, 531, 98, 87, 499],
        color: "#FFC047",
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: false,
          columnWidth: "40%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      color: ["#FFC047", "#0358AC"],
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        labels: {
          style: {
            colors: "#858585",
          },
        },
      },
      yaxis: {
        title: {
          show: false,
        },
        tickAmount: 4,
        max: 2000,
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
    },
  });

  const legendStyle = {
    "& .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center": {
      display: "none",
    },
  };

  return (
    <div>
      <div id="chart" className={classes.chart}>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={165}
        />
      </div>
    </div>
  );
};

export default UserSingleBarGraph;
