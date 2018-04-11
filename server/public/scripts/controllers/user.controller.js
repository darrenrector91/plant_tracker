myApp.controller('UserController', ['UserService', function (UserService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.bigData = {};

  self.bigData.breakfast = false;
  self.bigData.lunch = false;
  self.bigData.dinner = false;

  // COLLAPSE =====================
  self.isCollapsed = false;

}]);