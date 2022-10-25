# aws-lambda-case
## Tokenización de Tarjetas

El presente repositorio se detalla un caso de uso real de tokenizacion de la informacion de tarjetas utilizando AWS Lambda conectado con un cluster de MongoDB para el almacenamiento de los dato.

## Features

- Arquitectura de 3 capas: controllador(lambda APIGateway), servicio, ORM (coneccion con mongodb).
- Manejo de validaciones por modulos
- AWS Lambda

## Arquitectura de carpetas
Se tiene la siguiente arquitectura de carpetas:

- database: guarda todos los archivos necesarios para el
  - client: guarda la connexion con la base de datos(MongoDB)
  - interfaces: guarda las interfaces de las colecciones de la base de datos
  - validations: guarda todas las funciones de validacion para cada atributo
    - utils: guarda validaciones generales que se reutilizan
- services: guarda los servicios necesarios para la aplicacion
- index.ts: guarda el APIGateway de AWS Lambda donde se utiliza el servicio para procesar la data enviada

Esta arquitectura respeta la clasica arquitectura de 3 capas, tratando de que cada funcion este encargada de una tarea especifica

## Tech

Herramientas Utilizadas

- [Typescript/Nodejs] - como base del proyecto para el backend
- [MongoDB] - base de datos no relacional
- [Jest,Chai, Postman] - para el testing de la aplicacion.

## Running it

Para ejecutar el proyecto puede seguir los siguientes pasos:
- Crear archivo .env conteniendo:
```
MONGODB_URI= mongodb+srv://cesar214567:masterking212@cluster0.zy8g2k3.mongodb.net/?retryWrites=true&w=majority

```
- instalar las dependencias y ejecutar tests
```sh
npm i
npm run test
```

- Para ambiente de produccion

```sh
npm run build
aws lambda create-function --function-name tokens --runtime "nodejs16.x" --role <your role here> --zip-file "fileb://dist/index.zip" --handler index.handler --timeout 40

```
