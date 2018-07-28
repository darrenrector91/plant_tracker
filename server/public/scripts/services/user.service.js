myApp.service('UserService', ['$http', '$location', function ($http, $location) {
    console.log('UserService Loaded');
    var self = this;

    self.userObject = {};
    self.espTemp = {}
    self.tableTemp = {
        list: []
    }

    self.getTemp = function () {
        $http({
            method: 'GET',
            url: 'https://api.thingspeak.com/channels/470875/fields/1.json?api_key=A59ZTI1P9ONS0ZRF&results=5'
        }).then(function (response) {
            //The last 5 temp readings
            self.tableTemp.list = response.data.feeds;
            //The last temp reading
            self.espTemp = response.data.feeds[4].field1;
            //The last 5 temp readings console
            console.log(self.tableTemp);
            console.log('Thingspeak data: ',self.tableTemp.list);
            //The last temp reading console
            console.log('temp', self.espTemp);
        })
        .catch(function (response) {
            console.log(response);
            
            console.log('error on get request');
        });
    }
    self.getTemp();
}]);