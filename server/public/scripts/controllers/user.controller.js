myApp.controller('UserController', ['UserService', '$http', function (UserService, $http, $timeout, $route) {
  // console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  let data = [];
  console.log(data);

  let labels = [];
  // console.log(labels);

  let moisture = [];
  //console.log(moisture);
  
  let moistureLabels = [];
  // console.log(moistureLabels);
  

  var ctx = document.getElementById('lineChart').getContext('2d');
  var ctxMoisture = document.getElementById('lineChart-Moisture').getContext('2d');

  var chart = new Chart(ctx, {
    type: 'line',

    data: {
      labels: labels,
      datasets: [{
        label: "Soil Temperature",
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
        data: data,
        fill: false
      }]
    },

    options: {
      title: {
        display: true,
        text: 'Soil Temperature',
        position: 'top',
        fontSize: 40,
        fontColor: '#000'
      },
      scales: {
        yAxes: [{
          ticks: {
            fontSize: 20,
            fontColor: '#000',
          },
          scaleLabel: {
            display: false,
            //labelString: 'Temp in ˚F',
            fontSize: 20
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 20,
            fontColor: '#000'
          },
          scaleLabel: {
            display: false,
            //labelString: 'Date/Time',
            fontSize: 20
          }
        }]
      },
      hover: {
        mode: 'nearest',
        fontSize: 8
      },
      legend: {
        display: false,
        position: 'bottom'
      }
    }

  });

  var chartMoisture = new Chart(ctxMoisture, {
    type: 'line',

    data: {
      labels: labels,
      datasets: [{
        label: "Soil Moisture",
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
        data: moisture,
        fill: false
      }]
    },

    options: {
      title: {
        display: true,
        text: 'Soil Moisture',
        position: 'top',
        fontSize: 40,
        fontColor: '#000'
      },
      scales: {
        yAxes: [{
          ticks: {
            fontSize: 20,
            fontColor: '#000',
          },
          scaleLabel: {
            display: false,
            //labelString: 'Temp in ˚F',
            fontSize: 20
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 20,
            fontColor: '#000'
          },
          scaleLabel: {
            display: false,
            //labelString: 'Date/Time',
            fontSize: 20
          }
        }]
      },
      hover: {
        mode: 'nearest',
        fontSize: 8
      },
      legend: {
        display: false,
        position: 'bottom'
      }
    }

  });

  /* Graph */
  self.getTemp = function () {
    $http({
      method: 'GET',
      url: 'https://api.thingspeak.com/channels/470875/feeds.json?api_key=3418Y1ZLI8BSNQ8W&results=5'
    }).then(function (response) {
      let jsonData = response.data.feeds;
      console.log('jsonData', jsonData);
      
      for (var i = 0; i < jsonData.length; i++) {
        labels.push(jsonData[i].created_at);
      }
      let arrLength = jsonData.length;

      for (var i = 0; i < arrLength; i++) {
        data.push(jsonData[i].field1);
      }
      console.log('temps', data);
      element = 0;
      for (let i = 0; i < data.length; i++) {
      }
      chart.update();
    })   
  }
  self.getTemp();

  self.reloadRoute = function() {
    route.reload();
 }

 self.btnSearch = function () {
  self.getTemp();
}
}]);

// need to figure out how to make auto checks to api 
// add data to database