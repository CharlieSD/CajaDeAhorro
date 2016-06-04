
angular
    .module('app').config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
        $routeProvider.when('/landing', {templateUrl: 'app/components/landing/landing.html',controller:'landingController'});
        $routeProvider.when('/Public/:id', {templateUrl: 'app/components/public/public.html',controller:'publicController'});
        $routeProvider.when('/BanCah', {templateUrl: 'app/components/admin/admin.html',controller:'adminController'});
        $routeProvider.otherwise({ redirectTo: '/landing', caseInsensitiveMatch: true });
        $locationProvider.html5Mode(false);
  }]);
