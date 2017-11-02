var biblioteca = angular.module("biblioteca", ['ngMaterial','dataGrid','pagination']);


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

//ACTUALIZAR LIBROS
biblioteca.controller('actualizarLibros',function($scope,$http,$mdToast,$mdDialog){


    $scope.gridOptions = {
                data: [],
                urlSync: false
            };
         // $http.post('../php/actualizarLibros.php')
         //    .success(function(data){
                //$scope.tabla = data;
                //var datos=JSON.stringify(response);
                // $scope.gridOptions.data = data;
                $scope.gridOptions.data = [{
                    
                        Codigo : 12345678981,
                        Titulo : "Laboratorio de PHP y MySQL",
                        Autor : 'Piero Berni Millet',
                        Editorial : 'Autoedición',
                        Edicion : 'Primera',
                        Clasificacion : 'TICs',
                        Ejemplares : 100
                    
                }];

                
            
    // });
    
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
             
        $http.post('../php/actualizarLibrosA.php',actualizar,{
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
             
        $http.post('../php/eliminarLibro.php',eliminar,{
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

            $http.post('../php/actualizarLibro.php',form,{
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
