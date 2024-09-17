import React, { useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import { makeStyles } from "@material-ui/core";
// Styles for the component
const useStyles = makeStyles(() => ({
  chart: {
    "& .apexcharts-text tspan": {
      fontSize: "14px",
      fontWeight: 400,
    },
  },
}));
// Component for rendering a grouped bar graph to display comparison data between "Videos" and "HVO Pages".
const GroupBarGraph = () => {
  const chartRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    const options = {
      series: [
        { name: "Videos", data: [44, 45], color: "#0358AC" },
        { name: "HVO Pages", data: [30, 40], color: "#7DC371" },
      ],
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
          columnWidth: "50%",
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
      yaxis: {
        labels: {
          style: {
            margin: 20,
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

    if (chartRef.current) {
      chartRef.current.chart.updateOptions(options);
    }
  }, []);

  return (
    <div id="chart" className={classes.chart}>
      <ReactApexChart
        options={{}}
        series={[]}
        type="bar"
        height={180}
        ref={chartRef}
      />
    </div>
  );
};

export default GroupBarGraph;
