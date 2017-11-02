var biblioteca = angular.module("biblioteca", ['ngMaterial','ngMessages']);

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

biblioteca.controller('login',function($scope,$http,$location){
	$scope.login={};
    $scope.logear=function(){
        var login = JSON.stringify($scope.login);
        $http.post('../php/login.php',{login})
        .success(function(data){
            alert(data.split(",")[0]);
            console.log(data.split(",")[1]);
            window.location.assign(data.split(",")[1]);
            //$window.location.reload();
        });
        //"Bievenido,#/biblioteca"
    }
});

biblioteca.controller('registrar',function($scope,$http,$location,$mdDialog){
    $scope.delegacion=["Álvaro Obregón","Azcapotzalco","Benito Juárez","Coyoacán","Cuajimalpa de Morelos","Cuauhtémoc","Gustavo A. Madero","Iztacalco","Iztapalapa","Magdalena Contreras","Miguel Hidalgo","Milpa Alta","Tláhuac","Tlalpan","Venustiano Carranza","Xochimilco"];
    $scope.carrera=["Tecnologias de la informacion","Gestion Empresarial","Diseño Industrial"];
    $scope.semestre=[
        {
            label:"Primero",
            value:1
        },
        {
            label:"Segundo",
            value:2
        },
        {
            label:"Tercero",
            value:3
        },
        {
            label:"Cuarto",
            value:4
        },
        {
            label:"Quinto",
            value:5
        },
        {
            label:"Sexto",
            value:6
        },
        {
            label:"Septimo",
            value:7
        },
        {
            label:"Octavo",
            value:8
        },
        {
            label:"Noveno",
            value:9
        },
    ];
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
        $http.post('../php/registro.php',{registro})
        .success(function(data){
            alert(data.split(",")[0]);
            $mdDialog.hide();
            $window.location.reload();
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
