myApp.controller('UserController', ['UserService', '$http', function (UserService, $http) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.espTemp = {}
  self.tableTemp = {
    list: []
  }

  /* Graph */
  var ctx = document.getElementById('lineChart').getContext('2d');
  console.log();

  var chart = new Chart(ctx, {
    // Chart type
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
            fontSize: 20
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Date/Time',
            fontSize: 20
          }
        }]
      },
      legend: {
        display: false,
        position: 'bottom'
      }
    }
  });

  // self.getIOTdata = function () {
  //   UserService.getTemp();
  //   console.log(self.getIOTdata);

  // }


  // 'https://radiant-cove-60089.herokuapp.com/api/v1/login'

  self.getTemp = function () {
    $http({
      method: 'GET',
      url: 'https://api.thingspeak.com/channels/470875/feeds.json?api_key=BVCBAPTG0YM0STEA&results=5'
    }).then(function (response) {
      //The last 5 temp readings
      self.tableTemp.list = response.data.feeds;

      //The last temp reading
      // chart.chart.config.data.labels = response.data.feeds[4].created_at;
      chart.chart.config.data.datasets[0].data = response.data.feeds[4].field1;
      console.log(chart.chart.config.data.datasets[0].data);

      console.log(response.data.feeds[4].field1);
      console.log(response.data.feeds[4].created_at);

      chart.update();

      // self.espTemp = response.data.feeds[4].field1;
      //The last 5 temp readings console
      console.log(self.tableTemp);
      console.log(self.tableTemp.list);
      //The last temp reading console
      // console.log('temp', self.espTemp);
    })
  }
  self.getTemp();
}]);