<template>
    <div ref="chartContainer" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script setup>
  import Highcharts from 'highcharts';
  import HighchartsMore from 'highcharts/highcharts-more';
  
  // Import the required modules for Highcharts
  HighchartsMore(Highcharts);
  
  const chartContainer = ref(null);
  let chart;
  
  if (process.client) {
    onMounted(() => {
      // Create the donut chart
      chart = Highcharts.chart(chartContainer.value, {
        chart: {
          type: 'pie',  // Use 'pie' for donut chart
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0,
            depth: 250,
            viewDistance: 25,
          }
        },
        title: {
          text: 'Games Summary'
        },
        plotOptions: {
          pie: {
            innerSize: '50%', // Makes the pie a donut
            depth: 45,
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Games',
          data: [
            { name: 'Live', y: 61 },
            { name: 'Fishing', y: 14 },
            { name: 'Electronic', y: 10 },
            { name: 'Lottery', y: 47 },
            { name: 'Sports', y: 48 },
            { name: 'Chess', y: 75 },
            { name: 'E-sports', y: 75 }
          ]
        }]
      });
    });
  
    // Cleanup the chart on component unmount
    onBeforeUnmount(() => {
      if (chart) {
        chart.destroy();
      }
    });
  }
  </script>
  
  <style scoped>
  #chartContainer {
    width: 100%;
    height: 400px; /* Set a height for the chart */
  }
  </style>
  