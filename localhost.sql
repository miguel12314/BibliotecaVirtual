-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 03-12-2016 a las 01:13:27
-- Versión del servidor: 5.7.15-log
-- Versión de PHP: 5.6.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--
CREATE DATABASE IF NOT EXISTS `biblioteca` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `biblioteca`;

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `a` ()  SELECT IF(NOW()>(SELECT fechaRecoger FROM apartados WHERE Matricula=121210123),'SI','NO')$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Usuario` (`valor` INT, `MatriculaUser` INT)  BEGIN
	DECLARE page INT DEFAULT valor;
	CASE page
		WHEN 1
			THEN
				SELECT
			    CONCAT('{"Titulo":"',Titulo,
			    	   '","imagen":"','img/angular.png',
			           '","FechaP":"',Fecha_Prestamo, 
			           '","DiasRestantes":"', Fecha_Entrega,'"},') 
			  AS libros
			  FROM adeudos WHERE Matricula = MatriculaUser;
		
		WHEN 2
			THEN
			  SELECT
			    CONCAT('{"ID":"',ID_Prestamo,
		    		   '","imagen":"',imagen,
			           '","Titulo":"',Libro, 
			           '","Autor":"',Autor, 
			           '","Editorial":"', Editorial, 
			           '","Edicion":"', Edicion, 
			           '","Ejemplares":"', Ejemplares, '"},') 
			  AS libros
			  FROM prestamo_libro;
		WHEN 3
			THEN
			  SELECT
			    CONCAT('{"ID":"',ID_Apartado,
			    	   '","imagen":"','img/angular.png',
			           '","Titulo":"',Libro, 
			           '","fecha_pedido":"', fechaPedido, 
			           '","fecha_recoger":"', fechaRecoger,'"},') 
			  AS libros
			  FROM apartados WHERE Matricula = MatriculaUser;
	END CASE;
END$$

--
-- Funciones
--
CREATE DEFINER=`root`@`localhost` FUNCTION `
` (`MatriculaUser` INT, `LibroPrestamo` VARCHAR(100)) RETURNS VARCHAR(50) CHARSET utf8 BEGIN
	IF EXISTS(SELECT COUNT(*) FROM apartados WHERE Matricula=MatriculaUser) > 1 THEN
		RETURN 'Lo siento solo puedes consultar 2 libros';
	ELSE
		  INSERT INTO apartados(Matricula,
		  						Libro,
		  						fechaRecoger)
		  VALUES(MatriculaUser,
		  		 LibroPrestamo,
		  		 CONCAT(DATE_ADD(CURDATE(),INTERVAL 1 DAY),' 16:00:00'));
		  RETURN 'Tienes 1 dia para recoger el libro';
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `actualizacion` () RETURNS VARCHAR(50) CHARSET utf8 BEGIN
	IF EXISTS((SELECT fechaRecoger FROM apartados WHERE fechaRecoger<NOW())) THEN
		DELETE FROM apartados where fechaRecoger<NOW();
		RETURN 'YA VALIO MADRES TU LIBRO';
	END IF;
	
	IF EXISTS((SELECT * from adeudos WHERE Fecha_Entrega<NOW())) THEN
		DELETE FROM adeudos where Fecha_Entrega < NOW();
		RETURN 'Lo siento se paso su limite del prestamo';
	END IF;
	
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `adeudos` (`MatriculaUser` INT, `TituloLibro` VARCHAR(50)) RETURNS VARCHAR(50) CHARSET utf8 BEGIN
	IF ((SELECT COUNT(*) FROM adeudos WHERE Matricula = MatriculaUser)) > 1 THEN
		RETURN 'El alumno ya tiene limite de libros';
	ELSE
		IF EXISTS(SELECT * FROM apartados WHERE Matricula = MatriculaUser AND Libro = TituloLibro) THEN
			DELETE FROM apartados WHERE Matricula = MatriculaUser AND Libro = TituloLibro;
		END IF;
		
		INSERT INTO adeudos(Matricula,Titulo,Fecha_Entrega)
		VALUES(MatriculaUser,TituloLibro,DATE_ADD(NOW(),INTERVAL 1 MINUTE));
		RETURN 'Registrado';
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `DevolucionLibro` (`MatriculaUser` INT, `TituloLibro` VARCHAR(50)) RETURNS VARCHAR(50) CHARSET utf8 BEGIN
	IF EXISTS(SELECT * FROM adeudos WHERE Matricula = MatriculaUser AND Titulo=TituloLibro) THEN
		DELETE FROM adeudos WHERE Matricula=MatriculaUser AND Titulo=TituloLibro;
	RETURN 'LIBRO ENTREGADO';
	ELSE
		RETURN 'NO EXISTE';
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `login` (`Umatricula` INT, `Pass` VARCHAR(50)) RETURNS VARCHAR(50) CHARSET utf8 BEGIN

 IF(SELECT COUNT(*) FROM login where Matricula=UMatricula AND Password=Pass) > 0
    THEN
  RETURN 'Bievenido,biblioteca';
  else
  RETURN 'Usuario o Password Incorrecto';
  END IF;
  END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `PrestamoLibro` (`MatriculaUser` INT, `Libro` VARCHAR(50)) RETURNS VARCHAR(50) CHARSET utf8 BEGIN
	if((SELECT COUNT(*) FROM adeudos WHERE Matricula = MatriculaUser)+(SELECT COUNT(*) FROM apartados WHERE Matricula=MatriculaUser)) > 1 THEN
		RETURN 'Tiene el limite de libros';
	ELSE
		INSERT INTO apartados(Matricula,Libro,fechaRecoger)
		
		VALUES(MatriculaUser,Libro,DATE_ADD(NOW(),INTERVAL 1 MINUTE));
	RETURN 'Libro Apartado';
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `Registro` (`TipoInsert` INT, `P_Nombre` VARCHAR(50), `P_ApellidoP` VARCHAR(50), `P_ApellidoM` VARCHAR(50), `P_Sexo` VARCHAR(2), `P_Calle` VARCHAR(50), `P_NoInt` INT, `P_NoExt` INT, `P_Colonia` VARCHAR(50), `P_Delegacion` VARCHAR(50), `P_Correo` VARCHAR(50), `P_Password` BLOB, `P_Matricula` INT, `P_Carrera` VARCHAR(50), `P_Semestre` INT) RETURNS VARCHAR(255) CHARSET utf8 BEGIN
CASE TipoInsert WHEN 1 
  THEN 
    IF EXISTS(select * FROM datos_escolar_alumno WHERE Matricula=P_Matricula) 
      THEN RETURN 'YA SE ENCUENTRA REGISTRADO,'; 
    ELSE
      INSERT INTO datospersonalalumno(Nombre,ApellidoP,ApellidoM,Sexo,Calle,NoInt,NoExt,Colonia,Delegacion,Correo,Password) VALUES(P_Nombre,P_ApellidoP,P_ApellidoM,P_Sexo,P_Calle,IFNULL(P_NoInt,NULL),IFNULL(P_NoExt,NULL),P_Colonia,P_Delegacion,P_Correo,IFNULL(P_Password,'FGHF'));
      
      INSERT INTO datos_escolar_alumno(Matricula,Carrera,Semestre) VALUES(P_Matricula,P_Carrera,P_Semestre);
      
      INSERT INTO login(Matricula,Password) VALUES(P_Matricula,P_Password);
      RETURN 'Registrado,"#/login"'; 
    END IF;
  END CASE;
  
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `Registro_Libros` (`CodigoLibro` INT, `TituloLibro` VARCHAR(50), `AutorLibro` VARCHAR(50), `ClasificacionLibro` VARCHAR(50), `EditorialLibro` VARCHAR(50), `EdicionLibro` VARCHAR(50), `EjemplaresLibro` INT, `imagenes` VARCHAR(50)) RETURNS VARCHAR(50) CHARSET utf8 BEGIN
  if EXISTS(select * from codigo WHERE Codigo=CodigoLibro) THEN
  RETURN 'El libro ya se encuentra registrado';
  ELSE
  	
  	INSERT INTO prestamo_libro(Libro,Autor,Editorial,Edicion,Ejemplares,imagen) VALUES(TituloLibro,AutorLibro,EditorialLibro,EdicionLibro,EjemplaresLibro,imagenes);
  	INSERT INTO inventario(Titulo,Autor,Editorial,Edicion,Clasificacion,Ejemplares,imagen)
		   VALUES(TituloLibro,AutorLibro,EditorialLibro,EdicionLibro,ClasificacionLibro,EjemplaresLibro,imagenes);
  RETURN 'Libro Registrado';
END IF;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actualizar`
--

CREATE TABLE `actualizar` (
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `actualizar`
--

INSERT INTO `actualizar` (`fecha`, `Nombre`) VALUES
('2016-10-19 04:54:50', NULL),
('2016-10-22 00:16:56', 'MIGUEL CORDOBA BUENO'),
('2016-10-22 00:17:54', '1'),
('2016-10-22 00:17:54', '2'),
('2016-10-22 00:17:54', '3'),
('2016-10-22 00:17:54', '4'),
('2016-10-22 00:17:54', '5'),
('2016-10-23 03:49:00', 'Miguel'),
('2016-10-23 03:50:00', 'Miguel'),
('2016-10-23 03:51:00', 'Miguel'),
('2016-10-23 03:52:00', 'Miguel'),
('2016-10-23 03:53:00', 'Miguel'),
('2016-10-23 03:54:00', 'Miguel'),
('2016-10-23 03:55:00', 'Miguel'),
('2016-10-23 03:56:00', 'Miguel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adeudos`
--

CREATE TABLE `adeudos` (
  `ID_Adeudo` int(11) NOT NULL,
  `Matricula` int(11) NOT NULL,
  `Titulo` varchar(50) NOT NULL,
  `Fecha_Prestamo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Fecha_Entrega` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apartados`
--

CREATE TABLE `apartados` (
  `ID_Apartado` int(11) NOT NULL,
  `Matricula` int(11) NOT NULL,
  `fechaPedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fechaRecoger` datetime NOT NULL,
  `Libro` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `apartados`
--

INSERT INTO `apartados` (`ID_Apartado`, `Matricula`, `fechaPedido`, `fechaRecoger`, `Libro`) VALUES
(1, 121210124, '2016-11-22 05:22:43', '2016-11-21 23:23:43', ''),
(2, 121210123, '2016-11-22 21:55:31', '2016-11-22 15:56:31', 'Migdfjksk'),
(3, 121210123, '2016-11-22 21:55:45', '2016-11-22 15:56:45', 'MICROSOFT EXCEL PARA PYMES'),
(4, 121210125, '2016-11-25 07:41:12', '2016-11-25 01:42:12', 'Titulo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autor`
--

CREATE TABLE `autor` (
  `ID_Autor` int(11) NOT NULL,
  `Autor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `autor`
--

INSERT INTO `autor` (`ID_Autor`, `Autor`) VALUES
(1, 'MIGUEL CORDOBA BUENO'),
(2, 'JUAN FARRES CAVAGNARO'),
(3, ''),
(4, 'GARCIA FRONTI,MATIAS SANTIAGO'),
(5, 'jkshsd'),
(7, 'sdf'),
(8, 'Jaladas'),
(9, 'ert'),
(10, '65*'),
(11, '65*');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clasificacion`
--

CREATE TABLE `clasificacion` (
  `Id_Clasificacion` int(11) NOT NULL,
  `Clasificacion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clasificacion`
--

INSERT INTO `clasificacion` (`Id_Clasificacion`, `Clasificacion`) VALUES
(1, 'CIENCIAS BASICAS'),
(2, 'IGE'),
(3, ''),
(4, 'TIC´s'),
(5, 'dkjdfjkdkj'),
(7, 'sdf'),
(8, '21'),
(9, 'sdf'),
(10, 'Dcd'),
(11, 'Dcd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigo`
--

CREATE TABLE `codigo` (
  `ID_Codigo` int(11) NOT NULL,
  `Codigo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `codigo`
--

INSERT INTO `codigo` (`ID_Codigo`, `Codigo`) VALUES
(1, '123456789'),
(2, '121210123'),
(3, '0'),
(4, '123154555'),
(5, '12345'),
(7, '23'),
(8, '123146'),
(9, '2345'),
(10, '12'),
(11, '1246');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos_escolar_alumno`
--

CREATE TABLE `datos_escolar_alumno` (
  `ID` int(11) NOT NULL,
  `Matricula` int(11) NOT NULL,
  `Carrera` varchar(20) NOT NULL,
  `Semestre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `datos_escolar_alumno`
--

INSERT INTO `datos_escolar_alumno` (`ID`, `Matricula`, `Carrera`, `Semestre`) VALUES
(1, 125, 'IGE', 3),
(2, 125, 'IGE', 3),
(3, 121210123, 'Tecnologias de la in', 8),
(4, 121210124, 'ITICS', 0),
(5, 1231210125, 'ITICS', 4),
(6, 121210126, 'ITICS', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datospersonalalumno`
--

CREATE TABLE `datospersonalalumno` (
  `IdAlumno` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `ApellidoP` varchar(50) NOT NULL,
  `ApellidoM` varchar(50) NOT NULL,
  `Sexo` varchar(2) NOT NULL,
  `Calle` varchar(50) NOT NULL,
  `NoInt` int(11) DEFAULT NULL,
  `NoExt` int(11) DEFAULT NULL,
  `Colonia` varchar(50) NOT NULL,
  `Delegacion` varchar(50) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Password` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `datospersonalalumno`
--

INSERT INTO `datospersonalalumno` (`IdAlumno`, `Nombre`, `ApellidoP`, `ApellidoM`, `Sexo`, `Calle`, `NoInt`, `NoExt`, `Colonia`, `Delegacion`, `Correo`, `Password`) VALUES
(1, 'hjgjh346', 'dsfsdf', 'sdfsd', 'Ho', 'sdfs', 0, 0, 'sdf', 'Tlalpan', 'sd@f.ds', 0x31),
(2, 'hjgjh3463', 'dsfsdf', 'sdfsd', 'Ho', 'sdfs', 0, 0, 'sdf', 'Tlalpan', 'sd@f.ds', 0x31),
(3, 'Rebeca Raquel', 'Vela', 'Varga', 'Mu', 'Primavera', 0, 0, 'Barrio Alto', 'Gustavo A. Madero', 'rebacaraquel@hotmail.com', 0x3132333435),
(4, 'Miguel', 'Gonzalez', 'Segundo', 'on', 'Primavera', 12, 12, 'Candelaria', 'Gustavo A. Madero', 'miguel12314@hotmail.es', 0x4d696b6572),
(5, 'Vriginia', 'Segundo', 'Antonio', 'Fe', 'Primavera', 0, 0, 'Candelaria', 'GAM', 'viki123@hotmail.es', 0x3132333435),
(6, 'Virginia', 'segundo ', 'antonio', 'Fe', 'primavera ', 0, 0, 'Candelaria', 'Gam', 'viki@gmail.com', 0x3132333134);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edicion`
--

CREATE TABLE `edicion` (
  `ID_Edicion` int(11) NOT NULL,
  `Edicion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `editorial`
--

CREATE TABLE `editorial` (
  `ID_Editorial` int(11) NOT NULL,
  `Editorial` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `editorial`
--

INSERT INTO `editorial` (`ID_Editorial`, `Editorial`) VALUES
(1, 'TRILLAS'),
(2, 'PORRUA'),
(3, ''),
(4, 'dsfsdf'),
(5, 'sjdkfsdjk'),
(7, 'sdf'),
(8, 'Pipo'),
(9, 'sdfg'),
(10, 'Gdf'),
(11, 'Gdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `ID_Inventario` int(11) NOT NULL,
  `Titulo` varchar(50) NOT NULL,
  `Autor` varchar(50) NOT NULL,
  `Editorial` varchar(50) NOT NULL,
  `Edicion` varchar(50) NOT NULL,
  `Clasificacion` varchar(50) NOT NULL,
  `Ejemplares` int(11) NOT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`ID_Inventario`, `Titulo`, `Autor`, `Editorial`, `Edicion`, `Clasificacion`, `Ejemplares`, `imagen`) VALUES
(1, 'Migdfjksk', 'jkshsd', 'sjdkfsdjk', 'ew2', 'dkjdfjkdkj', 2, ''),
(2, 'dsf', 'sdf', 'sdf', 'sdfdf', 'sdf', 32, 'uploads/agui.jpg'),
(3, 'Bay bay', 'Jaladas', 'Pipo', 'Qje', '21', 12, 'uploads/1478675175907-1640732386.jpg'),
(4, '2345', 'ert', 'sdfg', 'sdfg', 'sdf', 4, 'uploads/banner.jpg'),
(5, 'Ege', '65*', 'Gdf', 'Gd', 'Dcd', 4, 'uploads/IMG-20161108-WA0000.jpg'),
(6, 'Ege', '65*', 'Gdf', 'Gd', 'Dcd', 4, 'uploads/1478675483862-1833018974.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `ID_Libro` int(11) NOT NULL,
  `Libro` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`ID_Libro`, `Libro`) VALUES
(1, 'LA TOMA DE DESICIONES EN LA PRACTICA'),
(2, 'ADMINISTRACION SISTEMICA Y ESTRATEGICA UN ENFOQUE '),
(3, ''),
(4, 'MICROSOFT EXCEL PARA PYMES'),
(5, 'Migdfjksk'),
(7, 'dsf'),
(8, 'Bay bay'),
(9, '2345'),
(10, 'Ege'),
(11, 'Ege');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `Id` int(11) NOT NULL,
  `Matricula` int(11) NOT NULL,
  `Password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`Id`, `Matricula`, `Password`) VALUES
(1, 125, '1'),
(2, 125, '1'),
(3, 121210123, '12345'),
(4, 121210124, 'Miker'),
(5, 1231210125, '12345'),
(6, 121210126, '12314');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo_libro`
--

CREATE TABLE `prestamo_libro` (
  `ID_Prestamo` int(11) NOT NULL,
  `Libro` varchar(255) NOT NULL,
  `Autor` varchar(255) NOT NULL,
  `Editorial` varchar(255) NOT NULL,
  `Edicion` varchar(255) NOT NULL,
  `Ejemplares` int(11) NOT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `prestamo_libro`
--

INSERT INTO `prestamo_libro` (`ID_Prestamo`, `Libro`, `Autor`, `Editorial`, `Edicion`, `Ejemplares`, `imagen`) VALUES
(1, 'LA TOMA DE DESICIONES EN LA PRACTICA', 'MIGUEL CORDOBA BUENO', 'TRILLAS', '21', 1, 'uploads/agui.jpg'),
(2, 'ADMINISTRACION SISTEMICA Y ESTRATEGICA UN ENFOQUE ', 'JUAN FARRES CAVAGNARO', 'PORRUA', '12', 2, 'uploads/agui.jpg'),
(4, 'MICROSOFT EXCEL PARA PYMES', 'GARCIA FRONTI,MATIAS SANTIAGO', 'dsfsdf', '4fgdf', 3, 'uploads/agui.jpg'),
(5, 'Migdfjksk', 'jkshsd', 'sjdkfsdjk', 'ew2', 2, 'uploads/agui.jpg'),
(7, 'Bay bay', 'Jaladas', 'Pipo', 'Qje', 12, 'uploads/agui.jpg'),
(8, '2345', 'ert', 'sdfg', 'sdfg', 4, 'uploads/banner.jpg'),
(9, 'Ege', '65*', 'Gdf', 'Gd', 4, 'uploads/IMG-20161108-WA0000.jpg'),
(10, 'Ege', '65*', 'Gdf', 'Gd', 4, 'uploads/agui.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t1`
--

CREATE TABLE `t1` (
  `ID` int(11) NOT NULL,
  `valor1` varchar(30) DEFAULT NULL,
  `valor2` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adeudos`
--
ALTER TABLE `adeudos`
  ADD PRIMARY KEY (`ID_Adeudo`);

--
-- Indices de la tabla `apartados`
--
ALTER TABLE `apartados`
  ADD PRIMARY KEY (`ID_Apartado`);

--
-- Indices de la tabla `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`ID_Autor`);

--
-- Indices de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  ADD PRIMARY KEY (`Id_Clasificacion`);

--
-- Indices de la tabla `codigo`
--
ALTER TABLE `codigo`
  ADD PRIMARY KEY (`ID_Codigo`);

--
-- Indices de la tabla `datos_escolar_alumno`
--
ALTER TABLE `datos_escolar_alumno`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `datospersonalalumno`
--
ALTER TABLE `datospersonalalumno`
  ADD PRIMARY KEY (`IdAlumno`);

--
-- Indices de la tabla `edicion`
--
ALTER TABLE `edicion`
  ADD PRIMARY KEY (`ID_Edicion`);

--
-- Indices de la tabla `editorial`
--
ALTER TABLE `editorial`
  ADD PRIMARY KEY (`ID_Editorial`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`ID_Inventario`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`ID_Libro`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `prestamo_libro`
--
ALTER TABLE `prestamo_libro`
  ADD PRIMARY KEY (`ID_Prestamo`);

--
-- Indices de la tabla `t1`
--
ALTER TABLE `t1`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adeudos`
--
ALTER TABLE `adeudos`
  MODIFY `ID_Adeudo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `apartados`
--
ALTER TABLE `apartados`
  MODIFY `ID_Apartado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `autor`
  MODIFY `ID_Autor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  MODIFY `Id_Clasificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `codigo`
--
ALTER TABLE `codigo`
  MODIFY `ID_Codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `datos_escolar_alumno`
--
ALTER TABLE `datos_escolar_alumno`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `datospersonalalumno`
--
ALTER TABLE `datospersonalalumno`
  MODIFY `IdAlumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `edicion`
--
ALTER TABLE `edicion`
  MODIFY `ID_Edicion` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `editorial`
--
ALTER TABLE `editorial`
  MODIFY `ID_Editorial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `ID_Inventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `ID_Libro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `prestamo_libro`
--
ALTER TABLE `prestamo_libro`
  MODIFY `ID_Prestamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `t1`
--
ALTER TABLE `t1`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `actualizacion` ON SCHEDULE EVERY 1 MINUTE STARTS '2016-11-09 11:59:00' ON COMPLETION NOT PRESERVE ENABLE DO SELECT actualizacion()$$

DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
