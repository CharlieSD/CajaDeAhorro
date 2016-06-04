
angular
    .module('app').config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
        $routeProvider.when('/landing', {templateUrl: 'app/components/landing/landing.html',controller:'landingController'});
        $routeProvider.otherwise({ redirectTo: '/landing', caseInsensitiveMatch: true });
        $locationProvider.html5Mode(false);
  }]);
