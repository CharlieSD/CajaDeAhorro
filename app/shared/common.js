angular
    .module('app')
	.service('common', common);

common.$inject = ['$location','$q','$cookies','$uibModal'];

function common($location, $q, $cookies,$uibModal) {

	servicio = {
		Collection:{
			addObject:addObject,
			deleteObject:deleteObject,
			findObject:findObject,
			suma:suma
		},
		Modal:{
			create:create
		},
		Connection:{
			close:close
		},
		Alerts:{
			create:createAlert
		},
		
		bloques:bloques,
		isEmpty: isEmpty,
		ready:ready
	};
	return servicio;
	
	function isEmpty(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop))
				return false;
		}

		return true && JSON.stringify(obj) === JSON.stringify({});
	}

	function ready() {
		return true;
	}

	function bloques(){
		return [
					{
						numero:1,
						nombre:"Bloque I",
						active:false
					},{
						numero:2,
						nombre:"Bloque II",
						active:false
					},{
						numero:3,
						nombre:"Bloque III",
						active:false
					},{
						numero:4,
						nombre:"Bloque IV",
						active:false
					},{
						numero:5,
						nombre:"Bloque V",
						active:false
					}];
	}

	function addObject(thisOne,Collection){
		var tmpCollection = angular.copy(Collection);
		tmpCollection.push(thisOne);
		return tmpCollection;
	}

	function suma(collection){
		var tmp = 0;
		angular.forEach(collection,function(objeto,key){

		});

	}



	function deleteObject(thisOne,Collection){
		var data = {
			deleted:false
		}
		var tmpCollection = angular.copy(Collection);
		angular.forEach(Collection,function(variable,indx){
			if(angular.equals(variable,thisOne)){
				tmpCollection.splice(indx,1);
				console.log('deleted from common');
			}
		});
		return tmpCollection;
	};



	function findObject(thisOne,thisValue,Collection){
		var tmpCollection = angular.copy(Collection);
		angular.forEach(Collection,function(variable,indx){
				console.log('Buscando');
		});
		return tmpCollection;
	}


	function create(config){
        var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: config.url,
              controller: config.controller,
              size: config.size,
              resolve:{
              	data:function(){
              		return config.data;
              	}
              }
            });

        return modalInstance.result.then(function (response) {
          if(response)
	          return response;
        }, function () {
         console.log('Modal dismissed at: ' + new Date());
        });    

	}



    function createAlert(msg,Collection,type){
		var tmp = {
			msg:msg,
			timeOut:3000
		};
		switch (type){
			case 1:
				tmp.type = 'success';
			break;
			case 2:
				tmp.type = 'danger';
			break;
			default:
				tmp.type = 'warning';
		}
		var tmpCollection = angular.copy(Collection);
		tmpCollection.push(tmp);
		return tmpCollection;
    }


}