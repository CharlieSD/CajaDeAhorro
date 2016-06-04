angular
    .module('app')
    .service('Login',loginService);
        

loginService.$inject = ['$http','$location','$q'];

function loginService($http,$location,$q){

	var promise;
	var service = {
        getUsers: getUsers,
        ready: ready
    };

    return service;
    //
    function getUsers(){
    	return $http.get('app/tets.js').then(getUserSuccess,getError)
    }

    function getUserSuccess(response){
    	if(response.data.permisos.login == true)
	    	if(response.data.permisos.admin == true )
	    		console.log('admin');
    		else
    			console.log('user');
    }

    function getError(data){
    	console.log('Error');
    }

    function ready(){

    }

}