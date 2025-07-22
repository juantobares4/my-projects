# Evaluación Final Integradora 2024 - Backend.

Programacion III | ITEC Río Cuarto.

Objetivo: Desarrrollar un Sistema de Gestión de Biblioteca de Juegos Digitales utilizando sequelize para backend, MySQL para base de datos y React para frontend.

## Tabla de contenidos
- [Fundamento del programa](#fundamento-del-programa)
- [Entorno Virtual e Inicio Local](#entorno-virtual-e-inicio-local)
- [Variables de entorno](#variables-de-entorno)
- [Integrantes](#integrantes)

## *Fundamento del programa*
***

El programa ofrece a sus usuarios un modo sin logueo que le permite navegar entre diferentes alternativas de videojuegos permitiendole filtrar de acuerdo a determinadas plataformas y tambien recorrer en base a  otros filtros sugeridos por las pagina. Tambien cuenta con funciones con logueo que le permitiran comprar los juegos que deseen, agregarlos a un carrito para una futura compra y tener acceso a un historial de las mismas.


## *Entorno Virtual e Inicio Local*
***
**Paso 1.**

Instalar dependencias

* Linux
```
npm install
```

**Paso 2.**

Crear en la raiz del proyecto carpeta con nombre "config", y dentro de carpeta "config", crear archivo "config.json" con el siguiente contenido:

* Linux
```
{
    "development": {
      "username": "root",
      "password": "",
      "database": "node",
      "host": "localhost",
      "dialect": "mysql",
      "port": 3306
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
```

El archivo en cuestion, permitira a Sequelize hacer las conexiones de bases de datos en los diferntes ambientes de trabajo cuando se le indique, debiendo completarse con las credenciales de base de datos correspondiente a cada maquina en que se instale.

**Paso 3.**

Crear base de datos.

* Linux
```
npx sequelize-cli db:create
```
Este comando tomara los datos del archivo "config.json" y creara una base de datos con los datos alli definidos.

**Paso 4.**

Ejecutar migraciones con el comando:

* Linux
```
npm run migrate
```

Este comando ingresara a la carpeta "migrations" y creara la estructura de la  base de datos en base a los archivos alli definidos.

**Paso 5.**

Cargar los datos preestablecidos con el comando:

* Linux
```
npm run seed
```
Este comando ingresara a la carpeta "seeders" y poblara la base de datos en base a los archivos alli definidos.

**Paso 6.**

Ver contenido sobre [Variables de entorno](#variables-de-entorno) y luego iniciar proyecto local con:

* Linux
```
npm run dev
```

Este comando levanta la instancia de sequelize que contiene los modelos definidos que fueron cargados gracias al archivo "index.js" de la carpeta "models", estableciendo la conexion con la base de datos y corre el proyecto en el puerto establecido.


## *Variables de entorno*

En archivo ".env.example" se encuentran las varibles de entorno necesarias para usar el proyecto en forma local. Crear archivo ".env" en la raiz del proyecto y utilizar aquellas que se requieran.


## *Integrantes*
***

* Irazoqui, Marcos - m.irazoqui@itecriocuarto.org.ar
* Martinez, Joaquin - jo.martinez@itecriocuarto.org.ar
* Tobares, Juan Cruz - j.tobares@itecriocuarto.org.ar