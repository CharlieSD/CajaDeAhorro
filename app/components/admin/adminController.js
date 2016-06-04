angular
    .module('app')
    .controller('adminController',adminController);
        
adminController.$inject = ['$scope','$http','common','$location','strings','traker'];

function adminController($scope,$http,common,$location,strings,traker){
	$scope.alertas = [];
	$scope.string = strings.esp.admin;
	$scope.errores = strings.esp.err;
	$scope.conceptos = [{id:1,nombre:"Deposito"},{id:3,nombre:"Pago"}];
	$scope.user = traker.recover('user');
	if(!$scope.user){
		$location.path('/landing');
	}

	$scope.vm = {
		createAlert:createAlert,
		removeAlert:removeAlert,
		logIn:logIn,
		logOut:logOut,
		ahorradores:[],
		grupo:{},
		putDeposit:putDeposit,
		calculoConImpuesto:calculoConImpuesto
	};

	if($scope.user.loged){
		splitGroup($scope.user.grupo);
	}

	function putDeposit(depo,usr){
		if(depo.total && depo.concepto){
			if(depo.concepto == 3 && usr.deuda === 0)
				createAlert("No hay deudas pendientes por pagar.",2);
			else if( usr.concepto == 3 && (usr.deuda < depo.total))
				createAlert("El pago no puede exceder a la deuda.",2);
			else{
					var transacciones = JSON.parse(localStorage.transacciones);
					var tmp = depo;
					tmp.id = transacciones.length+1;
					tmp.grupo = $scope.vm.grupo.id;
					tmp.fecha="04/06/2016";
					tmp.interes = 4;
					tmp.usuario = usr.id;
					console.log(tmp);
					createAlert("Deposito exitoso",1);
					transacciones.push(tmp);
					localStorage.transacciones = JSON.stringify(transacciones);
					splitGroup($scope.user.grupo);				
			}								

		}else
			createAlert("Faltan algunos datos.",2);	

	}


	function logOut(){
		$scope.user.loged = true;
		traker.update('user',$scope.user);
		$location.path('/landing');
	}

	function logIn(password){
		if($scope.user.password != password){
			createAlert($scope.errores.err1,2);
		}
		else{
			$scope.user.loged = true;
			traker.update('user',$scope.user);
			splitGroup($scope.user.grupo);
		}
	}

	function calculoConImpuesto(total){
		var res = total + (total* 0.04);
		if(!res)
			return 0;
		else
			return res;
	}


	function splitGroup(id){
		var selectedPeople = [];
		var totAhorro = 0;
		var selectGrupo = {};
		var people = JSON.parse(localStorage.usuarios);
		var grupos = JSON.parse(localStorage.grupos);
		var transacciones = JSON.parse(localStorage.transacciones);
		angular.forEach(people, function(persona, key){
			if(persona.grupo == id){
				persona.saldo = 0;
				persona.deuda = 0;
				persona.prestamos = 0;
				persona.historial = [];
				angular.forEach(transacciones,function(transaccion,key){
					if(persona.grupo == transaccion.grupo){
						if(persona.id == transaccion.usuario){
							if(transaccion.concepto == 1){
								persona.saldo += transaccion.total;

							}
							else if(transaccion.concepto == 2){
								persona.deuda += transaccion.total;
								persona.prestamos += 1;

							}
							else if(transaccion.concepto == 3){
								persona.deuda -= transaccion.total;

							}
							persona.historial.push(transaccion);
						}
						
					}
				});
				selectedPeople.push(persona);
				totAhorro += persona.saldo;
			}
		});
		angular.forEach(grupos, function(grupo, key){
			if(grupo.id == id){
				selectGrupo = grupo;
			}
		});
		$scope.vm.ahorradores = angular.copy(selectedPeople);
		$scope.vm.grupo = angular.copy(selectGrupo);
		$scope.vm.grupo.logros = strings.esp.logros.log2;
		$scope.vm.grupo.ahorroTotal = angular.copy(totAhorro);
		if(totAhorro >= 1000 && totAhorro <2500){
			$scope.vm.grupo.premio = strings.esp.premio2.pre1;
			$scope.vm.grupo.comon = strings.esp.logros.comon1  + String(2500-totAhorro) + ' mas,';
			$scope.vm.grupo.premio2 = strings.esp.premio2.pre2;
		}
		if(totAhorro >= 2500 && totAhorro <3500){
			$scope.vm.grupo.premio = strings.esp.premio2.pre2;
			$scope.vm.grupo.comon = strings.esp.logros.comon1  + String(3500-totAhorro) + ' mas,';
			$scope.vm.grupo.premio2 = strings.esp.premio2.pre3;
		}
		if(totAhorro >= 3500 ){
			$scope.vm.grupo.premio = strings.esp.premio2.pre3;
			$scope.vm.grupo.comon = strings.esp.logros.comon1 +  String(4500-totAhorro) + ' mas,';
			$scope.vm.grupo.premio2 = strings.esp.premio2.pre4;
		}
		$scope.vm.grupo.interes = 4;
		console.log($scope.vm.ahorradores);
		console.log($scope.vm.grupo);
	}

	function createAlert(string,type){
		$scope.alertas = common.Alerts.create(string,$scope.alertas,type);
	}


	function removeAlert(thisOne,Collection){
		$scope.alertas = common.Collection.deleteObject(thisOne,$scope.alertas);
	}

}
