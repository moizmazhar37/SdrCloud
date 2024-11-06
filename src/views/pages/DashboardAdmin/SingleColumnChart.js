import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { makeStyles } from "@material-ui/core";
import ApiConfig from "src/config/APIConfig";
import axios from "axios";

const useStyles = makeStyles(() => ({
  chart: {
    marginTop: "20px",
    width: "100%",
    "& .apexcharts-text tspan": {
      fontSize: "14px",
      fontWeight: 400,
    },
    "& .apexcharts-legend-marker": {
      borderRadius: "10px !important",
    },
  },
}));

const UserSingleColumnChart = () => {
  const classes = useStyles();
  const [fourMonthDetail, setFourMonthDetail] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    series: [],
    options: {},
  });

  const lastFourMonthData = async () => {
    const token = window?.localStorage?.getItem("token");
    try {
      const res = await axios({
        url: ApiConfig.lastFourMonthData,
        method: "GET",
        headers: {
          token: `${token}`,
        },
      });

      if (res?.data?.status === 200) {
        setFourMonthDetail(res?.data?.data || []); // Ensures data is always an array
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    lastFourMonthData();
  }, []);

  useEffect(() => {
    if (fourMonthDetail && fourMonthDetail.length > 0) {
      const totalViews = fourMonthDetail.map((item) => item?.totalViews || 0); // Fallback to 0 if totalViews is undefined
      const categories = fourMonthDetail.map((item) => item?.month || ""); // Fallback to empty string if month is undefined

      const options = {
        series: [
          {
            name: "Total Views",
            data: totalViews,
            color: "#0358AC",
            borderRadius: "50%",
          },
        ],
        chart: {
          type: "bar",
          height: 250,
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
          categories: categories,
          labels: {
            style: {
              colors: "#858585",
            },
          },
        },
        yaxis: {
          tickAmount: 4,
          min: 0,
          max: Math.ceil(Math.max(...totalViews) * 1.2),
          labels: {
            formatter: function (value) {
              return Math.floor(value);
            },
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "" + val;
            },
          },
        },
        legend: {
          position: "top",
          offsetX: 0,
          offsetY: 10,
        },
      };

      setChartOptions({
        series: options.series,
        options: options,
      });
    }
  }, [fourMonthDetail]);

  return (
    <div id="chart" className={classes.chart}>
      {chartOptions.series.length > 0 ? (
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="bar"
          height={250}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default UserSingleColumnChart;
