var biblioteca = angular.module("biblioteca.controller", ['ngMaterial','ngMessages','mdr.file']);

//DIRECTIVA DEL MENU
biblioteca.directive('menu',function(){
    return {
        restrict:'E',
        templateUrl:'templates/navegador.html'
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

//subir imagen
/*biblioteca.service('upload',['$http','$q',function($http,$q){
    this.enviar= function(file){
        var deferred=$q.defer();
        var formData= new formData();
        formData.append('imagenes',file);

        return $http.post('php/registroLibro.php',formData,{
            headers:{
                'Content-type':undefined
            },
            transformRequest:formData
        })
            .success(function(res){
                deferred.resolve(res);

            })
            return deferred.promise;
    }
}]);*/

// MENSAJE TOAST
function mensaje(data,$mdToast){
    $mdToast.show(
      $mdToast.simple()
        .textContent(data)
        .position('top right')
        .hideDelay(2000)
    );
}

//LOGIN
biblioteca.controller('login',function($scope,$http,$location){
    //alert("Hola");
    
    $scope.login={};
    $scope.logear=function(){
        var login = JSON.stringify($scope.login);
        $http.post('php/login.php',{login})
        .success(function(data){
            alert(data.split(",")[0]);
            $location.url(data.split(",")[1]);
            
        });
        "Bievenido,#/biblioteca"
    }
    
});

//REGISTRO ALUMNOS
biblioteca.controller('registrar',function($scope,$http,$location,$mdDialog){
    $scope.delegacion=["Álvaro Obregón","Azcapotzalco","Benito Juárez","Coyoacán","Cuajimalpa de Morelos","Cuauhtémoc","Gustavo A. Madero","Iztacalco","Iztapalapa","Magdalena Contreras","Miguel Hidalgo","Milpa Alta","Tláhuac","Tlalpan","Venustiano Carranza","Xochimilco","Otros"];
    $scope.carrera=["Tecnologias de la informacion","Gestion Empresarial","Diseño Industrial"];
    $scope.semestre=["1","2","3","4","5","6","7","8","9"];
    $scope.registro={};
    $scope.enviar=function(){
        
        
        //console.log($scope.registro.password);
        var registro =JSON.stringify($scope.registro);
        if($scope.registro.password == $scope.registro.rpassword){
            
            
        $mdDialog.show({
        template: '<md-dialog>'+
         '<md-toolbar><div class="md-toolbar-tools"> <h1>Reglamento de usuarios del Centro de Información:</h1> </div></md-toolbar>'+
         '<md-dialog-content>'+
         '<div style="padding:10px;text-align: justify;" class="md-dialog-content">'+
         '<p>El propósito del presente reglamento es normar las actividades del centro de información y los servicios que proporciona.</p>'+
         '<p><b>Capítulo I: Usuarios</b></p>'+
         '<p><b>Artículo I:</b> Se consideran usuarios internos del centro de información: maestros alumnos y personal en general del Instituto Tecnológico de Álvaro Obregón.</p>'+
         '<p><b>Artículo II:</b> Se consideran usuarios externos toda persona no considerada en el artículo anterior.</p>'+
         '<p><b>Capítulo II: Horarios</b></p>'+
         '<p><b>Artículo III:</b> Lunes a viernes 9:00 16:00 horas</p>'+
         '<p><b>Capítulo III:</b> Servicios</p>'+
         '<p><b>Artículo IV:</b> Préstamo Interno, este servicio comprende el uso del material bibliográfico dentro de la sala de lectura, a todo usuario que así lo requiera.</p>'+
         '<p><b>Artículo V:</b> Préstamo externo, es la autorización expresa a los usuarios internos para hacer uso del material bibliográfico fuera de la sala de lectura, por tres días con derecho a una renovación siempre y cuando el número de volúmenes existentes.</p>'+
         '<ul><p><b>Artículo V:</b> Préstamo externo, es la autorización expresa a los usuarios internos para hacer uso del material bibliográfico fuera de la sala de lectura, por tres días con derecho a una renovación siempre y cuando el número de volúmenes existentes.</p>'+
         '<li>En caso de ser un libro de lectura general el préstamo se realiza por una semana con derecho a una renovación.</li>'+
         '<li>Sólo el titular de la credencial vigente podrá hacer uso de este servicio y de los trámites de préstamo y devolución.</li>'+
         '</ul>'+
         '<p><b>CAPITULO IV SANCIONES:</b></p>'+
         '<p><b>Artículo VI:</b> Las obras de consulta, enciclopedias, diccionarios, manuales, directorios, prontuarios, diarios, publicaciones periódicas, material de reserva, tesis, normas, no pueden ser objeto de préstamo externo. Este material se prestara solo para fotocopias tres títulos diferentes y hasta una hora máximo.</p>'+
         '<p><b>Artículo VII:</b> los materiales no mencionados en el Artículo VI forman parte del acervo general.</p>'+
         '<p><b>Artículo VIII:</b> EL acervo general puede ser objeto de préstamo externo por 3 días, hasta dos títulos técnicos de lunes a miércoles, jueves y viernes para entrega al lunes siguiente; y 1 de literatura por una semana con derecho a renovación.</p>'+
         '<p><b>Artículo IX:</b> los préstamos externos admiten una renovación, siempre y cuando no esté solicitado por otro alumno.</p>'+
         '<p><b>Artículo X:</b> cubículos para estudio en grupo, el grupo solicitante lo formara de 4 a 8 personas. Se prestara por dos horas, pudiendo reservarse por una hora más, siempre y cuando no exista otra solicitud.</p>'+
         '<p><b>Artículo XI:</b> servicio especializado, este servicio se solicita a la persona encargada de la selección dejando la credencial vigente.</p>'+
         '<p><b>Artículo XII:</b> para hacer uso de los servicios es requisito presentar credencial vigente de la institución.</p>'+
         '<p><b>Artículo XIII:</b> a todos los usuarios que tengan adeudo no se les proporcionara ningún servicio.</p>'+
         '<p><b>Artículo XIV:</b> Todo usuario que muestre indisciplina se le retendrá su credencial por el resto del semestre y se notificara a Dirección y al departamento de Servicios Escolares para que procedan según la gravedad del caso.</p>'+
         '<ul><p><b>Artículo XV:</b> Préstamo externo:</p>'+
         '<li>Por cada día de retraso será un día de bloqueo.</li>'+
         '<li>Cinco días de retraso se donara un libro de texto.</li>'+
         '<li>Por más de 10 días de retraso se donara un libro de texto.</li>'+
         '<li>Por más de 30 días de retraso se donara un libro nuevo igual al que le fue prestado.</li>'+
         '</ul>'+
         '<p>Préstamo para copias o para uso en sala: una hora de retraso será un día de bloqueo.</p>'+
         '<p>Si el libro no es entregado el mismo día que haya sido prestado, se donara un libro de lectura.</p>'+
         '<p>Por más de tres días de retraso se donara un libro de texto.</p>'+
         '<p>*El libro será asignado por el personal del Centro de Información y tendrá que ser un libro nuevo.</p>'+
         '<p><b>Artículo XVI:</b> En caso de pérdida de una obra, se notificara a la sección de préstamo. Se dará una semana para su reposición. Si se entrega la misma obra (folio igual) se le sancionara según el Artículo 15. Si se entrega obra nueva, estará exento de la multa.</p>'+
         '<p><b>Artículo XVII:</b> Se recomienda guardar silencio, no introducir bebidas ni alimentos, y respetar las condiciones del Centro, en caso contrario se aplicaran sanciones marcadas en el Artículo 14.</p>'+
         '<p><b>Artículo XVIII:</b> La mutilación o robo de material bibliográfico es motivo de reposición de dos obras que requiera el Centro de Información.</p>'+
         '<p><b>Artículo XIX:</b> El instituto no extenderá documentos oficiales a alumnos que tengan adeudo pendiente con este Centro de Información, además no se les permitirá el proceso de cargas de materia en los periodos de reinscripción.</p>'+
         '<p><b>TRANSITORIO:</b> Los asuntos no previstos en este reglamento serán resueltos por la Subdirección de Planeación y Vinculación del Instituto y el jefe del Centro de Información.</p>'+
         '<h3>Gracias por su gentil colaboración.</h3>'+
            
         '</div></md-dialog-content>'+
         '  <div class="md-actions">' +
        '    <md-button ng-click="acepto()"  md-autofocus>' +
        '      ACEPTO TERMINOS' +
        '    </md-button>' +
        '    <md-button ng-click="cancelar()">' +
        '      CERRAR' +
        '    </md-button>' +
        '  </div>' +
        '</md-dialog>',
        controller: DialogController
      });
    function DialogController($scope, $mdDialog){
         $scope.cancelar=function(){
        $mdDialog.hide();
    }
         $scope.acepto=function(){
        $http.post('php/registro.php',{registro})
        .success(function(data){
            alert(data.split(",")[0]);
            $mdDialog.hide();
            $location.url(data.split(",")[1]);
        })
    }
    }
        }
        else{
            $scope.registro.password="";
            alert("Las contraseñas no coinciden");
        }
    };
});

//BILIOTECA

biblioteca.controller('biblioteca',function($scope, $http,$mdDialog,$mdToast){
    var img='img/angular.png';

    //CAMBIO DE PAGINA
    $scope.page=function(pagina){
        
        $http.post('php/pretamo.php',{page:pagina})
        .success(function(data){
                $scope.Libro=data;
        });
    };
    
    
    
/*-----------------------PESTAÑA PRESTAMOS----------------------------*/

    //Libros PRESTAMO
    

        $scope.prestar=function(libro,imagen,ev){

             var confirmar = $mdDialog.confirm()
            .title('Deseas Apartar Este Libro')
            .targetEvent(ev)
            .ok('Apartar')
            .cancel('Cancelar');
            
            $mdDialog.show(confirmar)
            .then(function(){
                
               
                //console.log(JSON.stringify($scope.nuevo));
                $http.post('php/apartado.php',{libro:libro,imagen:imagen})
                .success(function(data){
                    mensaje(data,$mdToast);
                   
                });
            },
                function(){
                $scope.Libros.ID=false;
            });

    };

    
/*-----------------------FIN PESTAÑA PRESTAMOS----------------------------*/
});



//-------------------------------REGISTRO DE LOS LIBROS --------------------------------------------------
biblioteca.controller('registroLibros',function($scope,$mdDialog,$http,$mdToast){
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
    $scope.devolucion=function(){
        var codigo=$scope.devolver.codigo;
        var matricula = $scope.devolver.matricula;
        $http.post('php/devolucion.php',{codigo:codigo,matricula:matricula})
        .success(function(data){
            mensaje(data,$mdToast);
                $scope.devolver = "";
        });
    }
});

//ACTUALIZAR LIBROS
biblioteca.controller('actualizarLibros',function($scope,$http,$mdToast,$mdDialog){



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
