angular
    .module('app')
    .controller('landingController',landingController);
        
landingController.$inject = ['$scope','Login','$http','common','$location','traker'];

function landingController($scope,Login,$http,common,$location,traker){
	$scope.alertas = [];
	$scope.vm = {
		createAlert:createAlert,
		removeAlert:removeAlert,
		checkUser:checkUser
	};

	//Login.getUsers();

	var usuarios = [{nombre:'Alejandra Hernandez Moreno',id:1001,tipo:1,direccion:"Ra. Ixtacomitan 1ra Sección #20",loged:false,password:123456,grupo:1},
					{nombre:'Herminia Salazar Orozco',id:1002,tipo:2,grupo:1},
					{nombre:'Yuxil Tempecatl Mora',id:1003,tipo:2,grupo:1}];

	var grupos = [{id:1,semanal:30,nombre:'Ixta1'}];
	//var logros = [{tipo:1,min:2000,}]  //1 - individual, 2 - grupal

	var transacciones = [{grupo:1,id:1,concepto:1,total:30,fecha:'01/04/2016',usuario:1001,interes:4},//1 deposito
						 {grupo:1,id:2,concepto:1,total:500,fecha:'08/04/2016',usuario:1001,interes:4},
						 {grupo:1,id:3,concepto:1,total:500,fecha:'15/04/2016',usuario:1001,interes:4},
						 {grupo:1,id:4,concepto:1,total:500,fecha:'22/04/2016',usuario:1001,interes:4},
						 {grupo:1,id:5,concepto:1,total:470,fecha:'29/04/2016',usuario:1001,interes:4},

						 {grupo:1,id:6,concepto:1,total:300,fecha:'01/04/2016',usuario:1002,interes:4},
						 {grupo:1,id:7,concepto:1,total:200,fecha:'08/04/2016',usuario:1002,interes:4},
						 {grupo:1,id:8,concepto:1,total:70,fecha:'15/04/2016',usuario:1002,interes:4},
						 {grupo:1,id:9,concepto:2,total:156,fecha:'22/04/2016',usuario:1002,interes:4},// 2 prestamo
						 {grupo:1,id:10,concepto:3,total:156,fecha:'29/04/2016',usuario:1002,interes:4},//3 pago
						 {grupo:1,id:11,concepto:1,total:50,fecha:'29/04/2016',usuario:1002,interes:4},

						 {grupo:1,id:12,concepto:1,total:50,fecha:'01/04/2016',usuario:1003,interes:4},
						 {grupo:1,id:13,concepto:1,total:60,fecha:'08/04/2016',usuario:1003,interes:4},
						 {grupo:1,id:14,concepto:1,total:30,fecha:'15/04/2016',usuario:1003,interes:4},
						 {grupo:1,id:15,concepto:1,total:30,fecha:'22/04/2016',usuario:1003,interes:4},
						 {grupo:1,id:16,concepto:1,total:100,fecha:'29/04/2016',usuario:1003,interes:4},
						 {grupo:1,id:17,concepto:2,total:200,fecha:'29/04/2016',usuario:1003,interes:4}
						];
	localStorage.usuarios = JSON.stringify(usuarios);
	localStorage.grupos = JSON.stringify(grupos);
	localStorage.transacciones = JSON.stringify(transacciones);

	function checkUser(thisId){
		var found = false;
		var tmpU = JSON.parse(localStorage.usuarios);
			angular.forEach(tmpU, function(usuario, key){
				if(!found)
					if(usuario.id == thisId){
						found = true;
						if(usuario.tipo == 1 ){ //Admin
							traker.create('user',usuario);
							$location.path("/BanCah");
						}
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
