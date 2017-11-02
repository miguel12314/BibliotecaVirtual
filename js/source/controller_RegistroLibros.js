var biblioteca = angular.module("biblioteca", ['ngMaterial']);
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
    }
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
biblioteca.controller('registroLibros', function($scope,$mdDialog,$http,$mdToast){
	
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

            $http.post('../php/registroLibro.php',form,{
            transformRequest: angular.identity,
            headers: {'Content-type':undefined}
            })
            .success(function(data){
                mensaje(data,$mdToast);
$scope.Codigo="";
$scope.Titulo="";
$scope.Autor="";
$scope.Clasificacion="";
$scope.Editorial="";
$scope.Edicion="";
$scope.Ejemplares="";
                //$scope.nuevo = "";

            })
        });
        
    }
});