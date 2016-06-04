angular
    .module('app')
    .service('newService',newService);
        

newService.$inject = ['$http','$location','$q'];

function newService($http,$location,$q){

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