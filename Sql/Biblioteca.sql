-------------------------------------------------FUENTES-----------------------------
-- FTP para conexiones seguras VSFTPD 
--https://docs.fedoraproject.org/es-ES/Fedora/13/html/Managing_Confined_Services/chap-Managing_Confined_Services-File_Transfer_Protocol.html

-------------------------------------------------------------------------------------


-- CREACION DE DE  BASE DE DATOS---------------
create database Biblioteca;
-------------------------------

-- CREACION DE TABLA LOGIN-------------
create table login(Id int PRIMARY KEY,Usuario varchar(50) not null,Password varchar(50) not null);
  ----------------------------------

-- REGISTROS EN LA TABLA LOGIN
--   INSERT INTO login(Id,Usuario,Password) VALUES(3,'sdfsddfs','Holda');
--------------------------------
-- CREACION TABLA REGISTRO--------------
--   create table registro(Id int auto_increment primary key,)


-- crear prucedimientos

DELIMITER //
CREATE FUNCTION login(Matricula int, Password varchar(50)) Returns bit
  BEGIN
  IF EXISTS (select * from login where Matricula=Matricula AND Password=Password)
    THEN 
  RETURN Matricula;
  else
  RETURN 0;
  END IF;
  END;
  DELIMITER ;
DROP function login

select * from apartados;
select * from inventario;}


-- BORRAR TABLAS
delete FROM biblioteca.autor;
delete FROM biblioteca.clasificacion;
delete FROM biblioteca.codigo;
delete FROM biblioteca.edicion;
delete FROM biblioteca.editorial;
delete FROM biblioteca.ejemplares;
delete FROM biblioteca.libros;
DELETE FROM apartados;
DELETE FROM adeudos;


-- REINICIAR AUTO INCREMENT
  ALTER TABLE biblioteca.autor AUTO_INCREMENT = 1;
     ALTER TABLE biblioteca.clasificacion AUTO_INCREMENT = 1;
     ALTER TABLE biblioteca.codigo AUTO_INCREMENT = 1;
     ALTER TABLE biblioteca.edicion AUTO_INCREMENT = 1;
     ALTER TABLE biblioteca.editorial AUTO_INCREMENT = 1;
     ALTER TABLE biblioteca.ejemplares AUTO_INCREMENT = 1;
      ALTER TABLE biblioteca.libros AUTO_INCREMENT = 1;
  ALTER TABLE biblioteca.prestamo_libro AUTO_INCREMENT = 1;


  
-- RECORRER Y QUITAR FECHAS
-- SUMAR DIAS
SELECT DATE_ADD(NOW(),INTERVAL 2 DAY);
-- RESTAR FECHA
SELECT DATE_SUB(NOW(),INTERVAL 2 DAY);
-- CONTAR DIAS
SELECT DATEDIFF(NOW(),'2016-09-22');

-- ENCENDER EVENTOS
SET GLOBAL event_scheduler=ON
SHOW PROCESSLIST;



-- CREAR TRIGGERS

CREATE TRIGGER actualizar campos