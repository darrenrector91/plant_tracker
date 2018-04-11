myApp.controller('UserController', ['UserService', '$http', function (UserService, $http) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  /* Line Graph */
  var ctx = document.getElementById('lineChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // dataset
    data: {
      labels: [],
      datasets: [{
        label: "Office Temperature",
        backgroundColor: 'rgb(255,0,0)',
        borderColor: 'rgb(255, 0, 0)',
        data: [],
        fill: false
      }]
    },

    // Configurations
    options: {
      title: {
        display: true,
        text: 'Office Temp',
        position: 'top',
        fontSize: 24,
        fontColor: '#000000'
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Temp in ˚F',
            fontSize: 18
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Date/Time',
            fontSize: 18
          }
        }]
      },
      legend: {
        display: false,
        position: 'bottom'
      }
    }
  });

  self.getIOTdata = function (){
    UserService.getTemp();
  }

  // self.getLineChartData = function () {
  //   $http.get('/temp')
  //     .then((response) => {
  //       chart.chart.config.data.labels = response.data.datesArray;
  //       chart.chart.config.data.datasets[0].data = response.data.mileageArray;
  //       chart.update();
  //     })
  //     .catch((err) => {
  //       console.log('error getting line chart data', err);
  //       // swal('Error getting chart information. Please try again later.', '', 'error');
  //     })
  // }
  // self.getLineChartData();

}]);