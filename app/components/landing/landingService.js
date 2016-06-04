angular
    .module('app')
    .service('landingService',landingService);
        

landingService.$inject = ['$http','$location','$q'];

function landingService($http,$location,$q){

	var promise;
	var service = {
        getUsers: getUsers,
        ready: ready
    };

    return service;
    //
    function getUsers(){
    	return $http.get('conciliacion/tets.js').then(getUserSuccess,getError)
    }

    function getUserSuccess(data){
    	console.log(data);
    }

    function getError(data){
    	console.log('Error');
    }
    function ready(){

    }

}