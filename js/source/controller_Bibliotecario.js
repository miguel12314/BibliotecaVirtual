var biblioteca = angular.module("biblioteca", ['ngMaterial','dataGrid','pagination']);

//DIRECTIVA TEXTO EN MAYUSCULA
biblioteca.directive('uppercased', function() {
    return {
        require: 'ngModel',        
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(input) {
                return input ? input.toUpperCase() : "";
            });
            element.css("text-transform","uppercase");
        }
    };
});
//DIRECTIVA DEL FOOTER
biblioteca.directive('pie',function(){
    return {
        restrict:'E',
        templateUrl:'../templates/footer.html',
        controller:'pie'
    }
});


// MENSAJE TOAST
function mensaje(data,$mdToast){
    $mdToast.show(
      $mdToast.simple()
        .textContent(data)
        .position('top right')
        .hideDelay(2000)
    );
}
//PRESTAMO DE LIBROS
biblioteca.controller('bibliotecario',function($scope,$http,$mdDialog,$mdToast){
    //GRID CONSULTA SITIO
    $scope.gridConsultaSitio = {
                data: [],
                urlSync: false
            };
    //      $http.post('../php/consultaSitio.php')
    //         .success(function(data){
    //             //$scope.tabla = data;
    //             //var datos=JSON.stringify(response);
    //             $scope.gridConsultaSitio.data = data;       
    // });

    $scope.gridConsultaSitio.data = [{
        ID_Adeudo:1,
        Matricula : 121210123,
        Titulo : "Laboratorio de PHP y MySQL",
    },
    {
        ID_Adeudo:1,
        Matricula : 121210144,
        Titulo : "Java: Bases + SQL",
    }];

     //GRID PRESTAMOS       
    $scope.gridpPrestamos = {
                data: [],
                urlSync: false
            };
    $scope.MostrarTabla=true;
    $scope.gridpPrestamos.data = [{
        ID_Adeudo:1,
        Matricula : 121210123,
        Titulo : "Laboratorio de PHP y MySQL",
    },
    {
        ID_Adeudo:1,
        Matricula : 121210144,
        Titulo : "Java: Bases + SQL",
    }];            

    //      $http.post('../php/devolucion.php')
    //         .success(function(data){
    //             //$scope.tabla = data;
    //             //var datos=JSON.stringify(response);
    //             $scope.gridpPrestamos.data = data;
    //             if (data!='null') {
    //                 $scope.MostrarTabla=true;
    //             }
    //             else{
    //                 $scope.MostrarMensaje=true;
    //             }
            
    // });            

    $scope.consultaSitioRegre=function(index,ev,numero){
        var grid=$scope.gridConsultaSitio.data;

        var confirmar = $mdDialog.confirm()
        .title('Desea regresar este Libro')
        .targetEvent(ev)
        .ok('Enviar')
        .cancel('Cancelar');
        
        $mdDialog.show(confirmar).then(function(){
            
            
            var form = new FormData;
            form.append("numero",numero);
            form.append("Matricula",null);
            form.append("Identificacion",null);
            form.append("Libro",null);

            $http.post('../php/consultaSitio.php',form,{
            transformRequest: angular.identity,
            headers: {'Content-type':undefined}
            })
            .success(function(data){
                mensaje(data,$mdToast);
                    $scope.gridConsultaSitio.data.splice(index, 1 );

            })
        });
    
        
    }


    //BOTON AGREGAR CONSULTA EN SITIO
    $scope.consultaSitio=function(ev){

        if($scope.prestamo.matricula != undefined && $scope.TipoIfentificacion !=undefined  && $scope.prestamo.codigo !=undefined) {
            var confirmar = $mdDialog.confirm()
                .title('Deseas Enviar el Formulario')
                .targetEvent(ev)
                .ok('Enviar')
                .cancel('Cancelar');
                
                $mdDialog.show(confirmar).then(function(){
                    
                    
                    var form = new FormData;
                    form.append("numero",'null');
                    form.append("Matricula",$scope.prestamo.matricula);
                    form.append("Identificacion",$scope.TipoIfentificacion);
                    form.append("Libro",$scope.prestamo.codigo);
                    
                    $http.post('../php/consultaSitio.php',form,{
                    transformRequest: angular.identity,
                    headers: {'Content-type':undefined}
                    })
                    .success(function(data){
                        mensaje(data.slice(1),$mdToast);
                        var agregar= data.slice(0,1);
                        console.log(agregar);
             $scope.gridConsultaSitio.data.push({
                                'Matricula':$scope.prestamo.matricula,
                                'Libro':$scope.prestamo.codigo,
                                'TIpoIdentificacion':$scope.TipoIfentificacion
                            })
                        
                        //scope.Codigo = "";
                        

                    })
                });
        }
        else{
            alert("Rellena todos los Campos");
        }  
    }


    //PRESTAMO LIBRO 
    $scope.registro=function(){
        var codigo=$scope.prestamo.codigo;
        var matricula = $scope.prestamo.matricula;
        $http.post('../php/entregaLibro.php',{codigo:codigo,matricula:matricula})
        .success(function(data){
                mensaje(data,$mdToast);
                $scope.prestamo = "";
        });
    }

    //DEVOLUCION LIBRO
    $scope.devolucion=function(index,ev,numero){
        
        var confirmar = $mdDialog.confirm()
                .title('Deseas Enviar el Formulario')
                .targetEvent(ev)
                .ok('Enviar')
                .cancel('Cancelar');
                
                $mdDialog.show(confirmar).then(function(){
                    
                    
                    var form = new FormData;
                    form.append("numero",numero);
                    $http.post('../php/devolucion.php',form,{
                    transformRequest: angular.identity,
                    headers: {'Content-type':undefined}
                    })
                    .success(function(data){
                        mensaje(data,$mdToast);
                        //var agregar= data.slice(0,1);
                        //console.log(agregar);
                            })
                        
                        //scope.Codigo = "";
                        
                });
    }
});