// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
var dataItem =  localStorage.getItem('dashboard_data')
var dataJSON = JSON.parse(dataItem) 
var values = [dataJSON.booked_flats,dataJSON.total_flats,dataJSON.total_towers]
var values2 = [dataJSON.total_monthly_earn,dataJSON.year]
var labels2 = ["Flats Month Earning","Flats Year Earning"]
console.log(values)
// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var ctx2 = document.getElementById("myPieChart2");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Booked Flats", "Total Flats", "Total Towers"],
    datasets: [{
      data: values,
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
var myPieChart2 = new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: labels2,
    datasets: [{
      data: values2,
      backgroundColor: [ '#003737', '#C46100'],
      hoverBackgroundColor: ['#009596', '#EC7A08', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
