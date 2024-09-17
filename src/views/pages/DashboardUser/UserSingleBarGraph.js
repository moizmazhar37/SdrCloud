import React, { useState } from 'react';
import {makeStyles,} from "@material-ui/core";
import ReactApexChart from 'react-apexcharts';
// makeStyles hook to define styles
const useStyles=makeStyles(()=>({
  chart:{
    '@media (max-width: 1280px)': {
      height: '274px',
    },
    
  }

}))
// UserSingleBarGraph component definition
const UserSingleBarGraph = () => {
  const classes=useStyles()
   // State to manage chart data
  const [chartData, setChartData] = useState({
    series: [{
      data: [2000, 55, 490, 306, 1537, 1080]
    }, {
      data: [76, 1055, 531, 98, 87,499]
    }],
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
          colors: {
            ranges: [{
              from: 0,
              to: 499,
              color: '#FFC047'
            },  {
              from: 500,
              to: 2000,
              color: '#0358AC' 
            },]
          },
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
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
      yaxis: {
        title: {
          show:false
        },
        tickAmount:4,
        max: 2000, 
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

  return (
    <div>
      <div id="chart" className={classes.chart}>
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar"  height={165}/>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default UserSingleBarGraph;

