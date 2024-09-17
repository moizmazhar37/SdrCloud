import React, { useState } from 'react';
import {makeStyles,} from "@material-ui/core";
import ReactApexChart from 'react-apexcharts';
// Styles for the component
const useStyles=makeStyles(()=>({
  chart:{
    "& .apexcharts-menu-icon, .apexcharts-reset-icon, .apexcharts-zoom-icon":{
      display:"none",
    },
    "& .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center, .apexcharts-legend.apx-legend-position-top.apexcharts-align-center":{
      display:"none",
    },
  }

}))
// Renders a single bar graph component for displaying credit activity
const CreditActiveSingleBarGraph = () => {
  const classes=useStyles()
  // Initializes chart data state with default options for the bar chart
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
            borderRadius: 6,
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    },
  });
// Customizes the legend style for the ApexCharts component
  const legendStyle = {
    "& .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center": {
      display: 'none'
    }
  };


  return (
    <div>
      <div id="chart" className={classes.chart}>
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar"  height={165}/>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CreditActiveSingleBarGraph;

