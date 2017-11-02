var biblioteca = angular.module("biblioteca.controller", ['ngMaterial','ngMessages','mdr.file','ngRoute','dataGrid','pagination'/*,'ng-fusioncharts'*/]);

//DIRECTIVA DEL 
biblioteca.directive('menu',function(){
    return {
        restrict:'E',
        templateUrl:'templates/DatosUsuario.html',
        controller:'menu'
    }
});

//DIRECTIVA DEL FOOTER
biblioteca.directive('pie',function(){
    return {
        restrict:'E',
        templateUrl:'templates/footer.html',
        controller:'pie'
    }
});


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
      

//DIRECTIVA SUBIR IMAGEN
biblioteca.directive('fileModel',['$parse',function($parse){
    return{
        restrict:'A',
        link:function(scope,iElement,iAttrs){
            var model = $parse(iAttrs.fileModel);
            var ModelSetter= model.assign;

            iElement.bind('change',function(){
                ModelSetter(scope,iElement[0].files[0]);
            });
        }
    };
}]);


// MENSAJE TOAST
function mensaje(data,$mdToast){
    $mdToast.show(
      $mdToast.simple()
        .textContent(data)
        .position('top right')
        .hideDelay(2000)
    );
}

//CUENTA
biblioteca.controller('menu',function($scope,$http,$location){
        
        $http.post('php/cuentaUsuario.php')
        .success(function(data){
            
             $scope.cuenta=eval(data); 

          });
    
});

//PIE DE PAGINA
biblioteca.controller('pie',function($scope,$http,$location){
        
});



//-------------------------------REGISTRO DE LOS LIBROS --------------------------------------------------
biblioteca.controller('registroLibros',function($scope,$mdDialog,$http,$mdToast){
    //alert("Hola")
     $scope.subir=function(){
        $scope.file;
     }

     //REGISTRO DE LIBROS
    $scope.enviar=function(ev){
        
        
        //$scope.nuevo={};

        var confirmar = $mdDialog.confirm()
        .title('Deseas Enviar el Formulario')
        .targetEvent(ev)
        .ok('Enviar')
        .cancel('Cancelar');                                                                                                                                                                                                
        
        $mdDialog.show(confirmar).then(function(){
            
            var file = $scope.imagenes;
            //console.log(file);

            /*upload.enviar(file).then(function(res){
                console.log(res);
            });
            */          
            var form = new FormData;
            form.append("Codigo",$scope.Codigo);
            form.append("Titulo",$scope.Titulo);
            form.append("Autor",$scope.Autor);
            form.append("Clasificacion",$scope.Clasificacion);
            form.append("Editorial",$scope.Editorial);
            form.append("Edicion",$scope.Edicion);
            form.append("Ejemplares",$scope.Ejemplares);
            form.append("imagenes",$scope.imagenes);            
            //form.append("codigo");

            $http.post('php/registroLibro.php',form,{
            transformRequest: angular.identity,
            headers: {'Content-type':undefined}
            })
            .success(function(data){
                mensaje(data,$mdToast);
                //$scope.nuevo = "";

            })
        });
        
    }


});

//PRESTAMO DE LIBROS
biblioteca.controller('bibliotecario',function($scope,$http,$mdDialog,$mdToast){
    //GRID CONSULTA SITIO
    $scope.gridConsultaSitio = {
                data: [],
                urlSync: false
            };
         $http.post('php/consultaSitio.php')
            .success(function(data){
                //$scope.tabla = data;
                //var datos=JSON.stringify(response);
                $scope.gridConsultaSitio.data = data;       
    });

     //GRID PRESTAMOS       
    $scope.gridpPrestamos = {
                data: [],
                urlSync: false
            };
         $http.post('php/devolucion.php')
            .success(function(data){
                //$scope.tabla = data;
                //var datos=JSON.stringify(response);
                $scope.gridpPrestamos.data = data;
                if (data!='null') {
                    $scope.MostrarTabla=true;
                }
                else{
                    $scope.MostrarMensaje=true;
                }
            
    });            

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

            $http.post('php/consultaSitio.php',form,{
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
                    
                    $http.post('php/consultaSitio.php',form,{
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
        $http.post('php/entregaLibro.php',{codigo:codigo,matricula:matricula})
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
                    $http.post('php/devolucion.php',form,{
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

//ACTUALIZAR LIBROS
biblioteca.controller('actualizarLibros',function($scope,$http,$mdToast,$mdDialog){


    $scope.gridOptions = {
                data: [],
                urlSync: false
            };
         $http.post('php/actualizarLibros.php')
            .success(function(data){
                //$scope.tabla = data;
                //var datos=JSON.stringify(response);
                $scope.gridOptions.data = data;

                
            
    });
    
    $scope.accion=function(id,codigo,Titulo,Autor,Editorial,Edicion,Clasificacion,Ejemplares){
        $mdDialog.show({
        template: '<md-dialog>'+
         '<md-toolbar><div class="md-toolbar-tools"> <h1>Que desea Hacer con el libro: " '+Titulo+' " </h1><span flex></span><md-button class="md-icon-button" ng-click="cancel()"><i class="material-icons">clear</i></md-button> </div></md-toolbar>'+
         '<md-dialog-content>'+
         '<div style="padding:10px;text-align: justify;" class="md-dialog-content">'+
         ''+
         '</div></md-dialog-content>'+
         '  <div class="md-actions">' +
        '    <md-button class="md-icon-button md-accent" ng-click="actualizar()"  md-autofocus>' +
        '     <i class="material-icons">border_color</i>   ' +
        '    </md-button>' +
        '    <md-button class="md-icon-button md-accent" ng-click="eliminar()">' +
        '      <i class="material-icons">delete_forever</i>' +
        '    </md-button>' +
        '  </div>' +
        '</md-dialog>',
        controller: desicion
      });

        function desicion($scope,$mdDialog) {

            $scope.cancel=function() {
                $mdDialog.hide();
            }



/*-----------------------------INICIO ACTUALIZAR----------------------*/
            $scope.actualizar=function(){
        
        console.log(codigo);
        $mdDialog.show({
        template: '<md-dialog style="width:50%;">'+
         '<md-toolbar><div class="md-toolbar-tools"> <h1>ACTUALIZACION DE LIBROS</h1> </div></md-toolbar>'+
         '<md-dialog-content>'+
         '<div style="padding:0;text-align: justify;" class="md-dialog-content">'+
         '<md-content class="md-no-momentum">'+
         '<md-input-container class="md-block" style="font-size: 20px;">'+
         '<label for="">Codigo</label>'+
         '<input type="text" ng-model="actualizar.Codigo">'+
         '</md-input-container>'+
         '<md-input-container class="md-block" style="font-size: 20px;">'+
         '<label for="">Titulo</label>'+
         '<input type="text" ng-model="actualizar.Titulo" uppercased>'+
         '</md-input-container>'+
         '<md-input-container class="md-block" style="font-size: 20px;">'+
         '<label for="">Autor</label>'+
         '<input type="text" ng-model="actualizar.Autor" uppercased>'+
         '</md-input-container>'+
         '<md-input-container class="md-block" style="font-size: 20px;">'+
         '<label for="">Editorial</label>'+
         '<input type="text" ng-model="actualizar.Editorial" uppercased>'+
         '</md-input-container>'+
         '<md-input-container class="md-block" style="font-size: 20px;">'+
         '<label for="">Edicion</label>'+
         '<input type="text" ng-model="actualizar.Edicion" uppercased>'+
         '</md-input-container>'+
          '<md-input-container class="md-block" style="font-size: 20px;">'+
         '<label for="">Clasificacion</label>'+
         '<input type="text" ng-model="actualizar.Clasificacion" uppercased>'+
         '</md-input-container>'+
          '<md-input-container class="md-block" style="font-size: 20px;">'+
         '<label for="">Ejemplares</label>'+
         '<input type="text" ng-model="actualizar.Ejemplares">'+
         '</md-input-container>'+
        '</md-content>'+
         '</div></md-dialog-content>'+
         '  <div class="md-actions">' +
        '    <md-button class="md-icon-button md-accent" ng-click="enviarActualizacion()"  md-autofocus>' +
        '     <i class="material-icons">done_all</i>  ' +
        '    </md-button>' +
        '    <md-button ng-click="cancelar()">' +
        '      CERRAR' +
        '    </md-button>' +
        '  </div>' +
        '</md-dialog>',
        controller: DialogController
      });
    function DialogController($scope, $mdDialog){
        
         //IMPUTS DE ACTUALIZACION DE LIBROS
         $scope.actualizar={
             
            Codigo:codigo,
            Titulo:Titulo,
            Autor:Autor,
            Editorial:Editorial,
            Edicion:Edicion,
            Clasificacion:Clasificacion,
            Ejemplares:Ejemplares
        }
         $scope.cancelar=function(){
        $mdDialog.hide();
    }
         $scope.enviarActualizacion=function(){
             
             var actualizar = new FormData;
            actualizar.append("id",id);
            actualizar.append("Codigo",$scope.actualizar.Codigo);
            actualizar.append("Titulo",$scope.actualizar.Titulo);
            actualizar.append("Autor",$scope.actualizar.Autor);
            actualizar.append("Clasificacion",$scope.actualizar.Clasificacion);
            actualizar.append("Editorial",$scope.actualizar.Editorial);
            actualizar.append("Edicion",$scope.actualizar.Edicion);
            actualizar.append("Ejemplares",$scope.actualizar.Ejemplares);
             
        $http.post('php/actualizarLibrosA.php',actualizar,{
            transformRequest: angular.identity,
            headers: {'Content-type':undefined}
            })
        .success(function(data){
            alert(data.split(",")[0]);
            $mdDialog.hide();
            //$location.url(data.split(",")[1]);
        })
    }
    }
       
    }

    $scope.eliminar=function(ev){
        
        var confirmar = $mdDialog.confirm()
        .title('¿DESEA ELIMINAR EL LIBRO "'+Titulo+'"')
        .targetEvent(ev)
        .ok('Eliminar')
        .cancel('Cancelar');
        
        $mdDialog.show(confirmar).then(function(){
            var eliminar = new FormData;
            eliminar.append("id",id);
             
        $http.post('php/eliminarLibro.php',eliminar,{
            transformRequest: angular.identity,
            headers: {'Content-type':undefined}
            })
        .success(function(data){
            alert(data.split(",")[0]);
            $mdDialog.hide();
            //$location.url(data.split(",")[1]);
        })
        });
        
    };
/*-----------------------------FIN ACTUALIZAR--------------------*/
            
        }
    }
    
    
     //REGISTRO DE LIBROS
    $scope.enviar=function(ev){
        
        //alert("dfdf");
        //$scope.nuevo={};

        var confirmar = $mdDialog.confirm()
        .title('Deseas Enviar el Formulario')
        .targetEvent(ev)
        .ok('Enviar')
        .cancel('Cancelar');
        
        $mdDialog.show(confirmar).then(function(){
            var file = $scope.imagenes;
            
            var form = new FormData;
            form.append("Codigo",$scope.Codigo);
            form.append("imagenes",$scope.imagenes);            

            $http.post('php/actualizarLibro.php',form,{
            transformRequest: angular.identity,
            headers: {'Content-type':undefined}
            })
            .success(function(data){
                mensaje(data,$mdToast);
                $scope.Codigo = "";

            })
        });
        
    }
});

//CONSULTAR EN SITIO
biblioteca.controller('consultaSitio',function($scope,$http,$mdToast,$mdDialog){



    
     //REGISTRO DE LIBROS
    $scope.enviar=function(ev){
        var confirmar = $mdDialog.confirm()
        .title('Deseas Enviar el Formulario')
        .targetEvent(ev)
        .ok('Enviar')
        .cancel('Cancelar');
        
        $mdDialog.show(confirmar).then(function(){
            
            
            var form = new FormData;
            form.append("Matricula",$scope.Matricula);
            form.append("Identificacion",$scope.TipoIfentificacion);
            form.append("Libro",$scope.Libro);
            
            $http.post('php/consultaSitio.php',form,{
            transformRequest: angular.identity,
            headers: {'Content-type':undefined}
            })
            .success(function(data){
                mensaje(data,$mdToast);
                $scope.Codigo = "";

            })
        });
        
    }
});

//ESTADISTICAS
biblioteca.controller('Estadisticas',function($scope){
    
    $scope.myDataSource = {
        chart: {
            caption: "Age profile of website visitors",
            subcaption: "Last Year",
            startingangle: "120",
            showlabels: "0",
            showlegend: "1",
            enablemultislicing: "0",
            slicingdistance: "15",
            showpercentvalues: "1",
            showpercentintooltip: "0",
            plottooltext: "Age group : $label Total visit : $datavalue",
            theme: "fint"
        },
        data: [
            {
                label: "Teenage",
                value: "125"
            }
        ]
    }

});


//PRUEBAS
biblioteca.controller('prueba',function($scope,$http,$mdToast){



    //DEVOLUCION LIBRO
    $scope.devolucion=function(){
       var file = $scope.imagenes;
       var hola =$scope.hola;
       var fd= new FormData();
       fd.append('file',file,"hola",hola);
        $http.post('php/upload.php',fd,{
            transformRequest: angular.identity,
            headers: {'Content-type':undefined}
        })
        .success(function(response){
            
        });
    }
});
