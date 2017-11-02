var biblioteca = angular.module('biblioteca',['ngMaterial','ngMessages','mdr.file','ngRoute','biblioteca.controller']);


biblioteca.config(function($routeProvider){
    $routeProvider
    .when('/login',{
        controller:'login',
        templateUrl:"templates/login.html"
    })
    .when('/registrar',{
        controller:'registrar',
        templateUrl:'templates/registro.html'
    })
    .when('/biblioteca',{
        controller:'biblioteca',
        templateUrl:'templates/usuario.html'
    })
    .when('/busqueda',{
        controller:"busqueda",
        templateUrl:"templates/busqueda.html"
    })
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
    
    .when('/pruebafile',{
        controller:"prueba",
        templateUrl:'templates/prueba.html'
    })
    .otherwise({redirectTo:'/login'});
});

