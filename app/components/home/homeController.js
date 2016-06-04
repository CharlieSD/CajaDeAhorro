angular
    .module('app')
    .service('homeService',homeService);

homeService.$inject = ['$http'];

function homeService($http){

	var promise;
	var service = {
        starthome: starthome,
        ready: ready
    };

    return service;
    
    //
    function starthome(){
    	console.log('usingHomeService');
    };
	
}