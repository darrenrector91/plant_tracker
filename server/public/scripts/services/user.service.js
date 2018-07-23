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
            url: 'GET https://api.thingspeak.com/channels/470875/feeds.json?api_key=3418Y1ZLI8BSNQ8W&results=5'
            // url: 'https://api.thingspeak.com/channels/470875/feeds.json?api_key=BVCBAPTG0YM0STEA&results=5'
        }).then(function (response) {
            //The last 5 temp readings
            self.tableTemp.list = response.data.feeds;
            //The last temo reading
            self.espTemp = response.data.feeds[4].field1;
            //The last 5 temp readings console
            console.log(self.tableTemp);
            console.log(self.tableTemp.list);
            //The last temp reading console
            console.log('temp', self.espTemp);
        })
    }
    self.getTemp();
}]);