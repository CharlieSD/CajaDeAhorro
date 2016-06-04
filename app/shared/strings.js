angular
    .module('app')
    .service('strings',stringsService);
        

stringsService.$inject = ['$http','$location','$cookies'];
	

function stringsService($http,$location,$cookies){
    var esp = {
        admin:{
            str1:"Bienvenido a Bancah",
            str2:"Contraseña",
            str3:'Entrar',
            str4:'Grupo de ahorro',
            str5:'Ahorro grupal acumulado',
            str6:'Interes actual',
            str7:'Nombre',
            str8:'Saldo',
            str9:'No. Prestamos',
            str10:'Deudas pendientes',
            str11:'deposito',
            str12:'prestamo',
            str13:'historial'

        },
        err:{
            err1:'Contraseña incorrecta'
        },
        logros:{
            log1:'¡Felicidades! Con tu ahorro ya te alcanzaría para ',
            log2:'¡Imagina! El ahorro grupal acumulado es suficiente para ', 
            comon1:' y con '
        },
        premio1:{
            pre1:'una licuadora',
            pre2:'una guitarra',
            pre3:'una computadora '
        },
        premio2:{
            pre1:'una bomba de agua',
            pre2:'una lavadora',
            pre3:'un panel solar',
        }
    };


	var service = {
        esp:esp
    };

    return service;			
	

}