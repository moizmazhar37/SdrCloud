import React, { useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import { makeStyles, } from "@material-ui/core";

// Styles for the component
const useStyles = makeStyles(() => ({
  chart: {
    marginTop: "20px",
    width: "100%",
    "& .apexcharts-text tspan": {
      fontSize: "14px",
      fontWeight: 400
    },
    "& .apexcharts-legend-marker": {
      borderRadius: "10px !important",
    },
  }

}))

// Renders a single column chart component for displaying user activity data over time
const UserSingleColumnChart = () => {
  const chartRef = useRef(null);
  const classes = useStyles()

  useEffect(() => {
    const options = {
      series: [
        { name: 'Total Active Media', data: [3000, 5097, 4007, 4056], color: '#0358AC', borderRadius: "50%" },
        { name: 'Total Views', data: [1542, 2560, 2556, 3245], color: '#CACACA', borderRadius: "50%" }, // Second set of data
      ],
      chart: {
        type: 'bar',
        height: 250,
        stacked: true, // Set to true for a stacked column bar chart
        toolbar: {
          show: false,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: false,
          columnWidth: '12px',
          endingShape: 'rounded',
          colors: {
            ranges: [
              {
                from: 0,
                to: 0,
                color: '#CACACA',

              },
              {
                from: 1,
                to: 1,
                color: '#0358AC',
              },
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
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Mar', 'Apr', 'May', 'Jun'],
        labels: {
          style: {
            colors: '#858585'
          }
        }
      },
      yaxis: {
      
        tickAmount: 4,  // Set the number of ticks
        max: 8000,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val;
          },
          position: 'center'
        },
      },
      css: {
        inset: 'none',
      },
      legend: {
        position: 'top',
        offsetX: 0,
        offsetY: 10
      },
    };

    if (chartRef.current) {
      chartRef.current.chart.updateOptions(options);
    }
  }, []); // Empty dependency array ensures useEffect runs once when the component mounts

  return (
    <div id="chart" className={classes.chart}>
      <ReactApexChart options={{}} series={[]} type="bar" height={250} ref={chartRef} />
    </div>
  )
};

export default UserSingleColumnChart;
