var biblioteca = angular.module('biblioteca',['ngMaterial','ngMessages','mdr.file','ngRoute','biblioteca.controller','dataGrid', 'pagination'/*,'ng-fusioncharts'*/]);


biblioteca.config(function($routeProvider){
    $routeProvider
    .when('/registroLibros',{
        controller:'registroLibros',
        templateUrl:'templates/registroLibros.html'
    })
    .when('/actualizarLibros',{
        controller:'actualizarLibros',
        templateUrl:'templates/actualizarLibro.html'
    })
    .when('/bibliotecario',{
        controller:"bibliotecario",
        templateUrl:'templates/bibliotecario.html'
    })
    .when('/consultaSitio',{
        controller:"consultaSitio",
        templateUrl:'templates/ConsultaSitio.html'
    })
    .when('/Estadisticas',{
        controller:"Estadisticas",
        templateUrl:"templates/Estadisticas.html"
    })
    .when('/pruebafile',{
        controller:"prueba",
        templateUrl:'templates/prueba.html'
    })
    .otherwise({redirectTo:'/actualizarLibros'});
});

