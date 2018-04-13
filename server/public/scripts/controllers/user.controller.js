myApp.controller('UserController', ['UserService', '$http', function (UserService, $http) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.espTemp = {}
  self.tableTemp = {
    list: []
  
  }
  let results = [6,8,4,10,2];
  let labels = ['A','B','C','D','E'];
  

  var ctx = document.getElementById('lineChart').getContext('2d');

  var chart = new Chart(ctx, {
    type: 'line',

    data: {
      labels: labels,
      datasets: [{
        label: "Office Temperature",
        backgroundColor: 'rgb(164, 198, 57)',
        borderColor: 'rgb(164, 198, 57)',
        data: results,
        fill: false
      }]
      
    },

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
  /* Graph */
  self.getTemp = function () {
    $http({
      method: 'GET',
      url: 'https://api.thingspeak.com/channels/470875/fields/1.json?api_key=BVCBAPTG0YM0STEA&results=20'
    }).then(function (response) {
      // jsonData = response.data.channel.updated_at;
      // jsonData = response.data;
      // console.log(jsonData.feeds);
      console.log(response.data.feeds);
      
      // let labels = [];
      for (var i = 0; i < response.data.feeds.length; i++) {
        labels.push(response.data.feeds[i].created_at);
      }
      console.log(labels);

      
      // let data = [];
      // for (var i = 0; i < json.length; i++) {
      //   data.push(json[i].field1);
      // }
      chart.update();
    })
  }
  self.getTemp();

  Date.prototype.formatMMDDYYYY = function () {
    return (this.getMonth() + 1) +
      "/" + this.getDate() +
      "/" + this.getFullYear();
  }



}]);