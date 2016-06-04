angular
    .module('app')
    .controller('landingController',landingController);
        
landingController.$inject = ['$scope','Login',];

function landingController($scope,Login){


	Login.getUsers();
}
