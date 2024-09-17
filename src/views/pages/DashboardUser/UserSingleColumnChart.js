import React, { useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
// UserSingleColumnChart component definition
const UserSingleColumnChart = () => {
  const chartRef = useRef(null);
 // Effect to update chart options
  useEffect(() => {
    const options = {
      series: [
        { name: 'Total Active Media', data: [3000, 5097, 4007, 4056],   color: '#0358AC',  },
        { name: 'Total Views', data: [1542, 2560, 2556, 3245] , color: '#CACACA', }, 
      ],
      chart: {
        type: 'bar',
        height: 300,
        stacked: true,
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
      },
      yaxis: {
        tickAmount:4,
        max: 8000, 
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands';
          },
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
  // Updating chart options if the chart ref is available
    if (chartRef.current) {
      chartRef.current.chart.updateOptions(options);
    }
  }, []);

  return <ReactApexChart options={{}} series={[]} type="bar" height={300} ref={chartRef} />;
};

export default UserSingleColumnChart;
