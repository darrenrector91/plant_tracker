myApp.controller('UserController', ['UserService', '$http', function (UserService, $http) {
  // console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  let data = [];
  console.log(data);

  let labels = [];
  console.log(labels);


  let num = ['20', '22'];
  let sum = 0;
  for (i = 0; i < num.length; i++) {
    sum += parseInt(num[i]);
    console.log('sum', sum);
  }



  var ctx = document.getElementById('lineChart').getContext('2d');

  var chart = new Chart(ctx, {
    type: 'line',

    data: {
      labels: labels,
      datasets: [{
        label: "Office",
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
        data: data,
        fill: false,
      }]
    },

    options: {
      title: {
        display: true,
        text: 'Office',
        position: 'top',
        fontSize: 24,
        fontColor: '#000'
      },
      scales: {
        yAxes: [{
          ticks: {
            fontSize: 15,
            fontColor: '#000',
          },
          scaleLabel: {
            display: true,
            // labelString: 'Temp in ˚F',
            fontSize: 20
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 20,
            fontColor: '#000'
          },
          scaleLabel: {
            display: true,
            // labelString: 'Date/Time',
            fontSize: 20
          }
        }]
      },
      legend: {
        display: true,
        position: 'bottom'
      }
    }

  });



  /* Graph */
  self.getTemp = function () {
    $http({
      method: 'GET',
      url: 'https://api.thingspeak.com/channels/470875/fields/1.json?api_key=BVCBAPTG0YM0STEA&results=5'
    }).then(function (response) {
      let jsonData = response.data.feeds;
      // console.log('self.espData', self.espData);
      // console.log(jsonData);

      for (var i = 0; i < jsonData.length; i++) {
        labels.push(jsonData[i].created_at);
        // console.log(jsonData[i].created_at);
        

      }
      console.log(labels);

      // let sum = {};
      let avg = {};
      let arrLength = jsonData.length;

      for (var i = 0; i < arrLength; i++) {
        data.push(jsonData[i].field1);
        console.log(jsonData[i].field1);

      }
      console.log('temps', data);
      element = 0;
      for (let i = 0; i < data.length; i++) {
        // element += data[i];
        let z = console.log(parseInt(data[i]));
      }
      chart.update();
    })
  }
  self.getTemp();

  // Date.prototype.formatMMDDYYYY = function () {
  //   return (this.getMonth() + 1) +
  //     "/" + this.getDate() +
  //     "/" + this.getFullYear();
  // }

}]);