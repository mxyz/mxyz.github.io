angular.module('todoApp')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('enroll', {
      url: "/enroll",
      templateUrl: "src/view/enrollpage.tmpl"
    })
    .state('login', {
      url: "/login",
      templateUrl: "src/view/login.tmpl"
    })
});
