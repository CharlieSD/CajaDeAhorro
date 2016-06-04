angular
    .module('app')
    .controller('publicController',publicController);
        
publicController.$inject = ['$scope','$http','common','$location'];

function publicController($scope,$http,common,$location){
	$scope.alertas = [];
	$scope.vm = {
		createAlert:createAlert,
		removeAlert:removeAlert,
		checkUser:checkUser
	};

	//Login.getUsers();

	var usuarios = [{nombre:'Alejandra Hernandez Moreno',id:1001,tipo:1,direccion:"Ra. Ixtacomitan 1ra Sección #20"},{nombre:'Herminia Salazar Orozco',id:1002,tipo:2,saldo:2000}];

	localStorage.usuarios = JSON.stringify(usuarios);


	function checkUser(thisId){
		var found = false;
		var tmpU = JSON.parse(localStorage.usuarios);
			angular.forEach(tmpU, function(usuario, key){
				if(!found)
					if(usuario.id == thisId){
						found = true;
						if(usuario.tipo == 1 )  //Admin
							$location.path("/Dashboard");
						else
							$location.path("/Public/"+thisId);
					}
			});
			if(!found)
			{
				createAlert("Usuario no encontrado",2);
			}			
	}



	function createAlert(string,type){
		$scope.alertas = common.Alerts.create(string,$scope.alertas,type);
	}


	function removeAlert(thisOne,Collection){
		$scope.alertas = common.Collection.deleteObject(thisOne,$scope.alertas);
	}

}
