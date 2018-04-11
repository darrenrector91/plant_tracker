myApp.service('UserService', ['$http', '$location', function ($http, $location) {
    console.log('UserService Loaded');
    var self = this;

    self.userObject = {};
    self.espTemp = {
        list: []
    }

    self.getTemp = function () {
        $http({
            method: 'GET',
            url: 'https://api.thingspeak.com/channels/470875/feeds.json?api_key=BVCBAPTG0YM0STEA&results=2'
        }).then(function (response) {
            self.espTemp.list = response.data;
            console.log('temp', self.espTemp.list.feeds[0].field1);

        })
    }
    self.getTemp();
}]);