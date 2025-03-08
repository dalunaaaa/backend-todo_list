// Requiriendo las dependencias necesarias
var express = require('express');
var cors = require('cors');
var path = require ('path');
const mysql = require('mysql2');

//var path = require('path');

// Crear una instancia de la aplicación Express
var app = express();

// Usar CORS para permitir solicitudes desde el puerto 5500 (o el origen de tu frontend)
app.use(cors({
  origin: 'http://127.0.0.1:5502' // Aquí puedes ajustar esto al origen de tu frontend
}));

// Middlewares para la configuración básica de Express
app.use(express.json()); // Para parsear JSON en las solicitudes
app.use(express.urlencoded({ extended: false })); // Para parsear formularios

// Rutas del servidor   
app.get('/', (req, res) => {
  res.send('¡Hola desde mi backend en Express!');
});

// Rutas adicionales
app.get('/hola', (req, res) => {
  res.send('¡hola mundo Dania!');
});



//-------------------------------------
//consultas a mi base de datos SQL en MYSQL SERVER
 const db = mysql.createConnection({
  host: '127.0.0.1',  // Cambiado de 'localhost' a '127.0.0.1'
  user: 'root',
  password: 'luna1907',
  database: 'todo_list',
 });

 //conectar a la base de datos
 db.connect((err) =>{
  if(err) {
    console.error('error de conexion a la base de datos:',err);
    return;
  }
  console.log('conexion a la base de datosestablecida');
 });

// Ruta para consultar los usuarios desde la base de datos
app.get('/tareas', (req, res) => {
  // Realiza una consulta SELECT a la base de datos
  
  db.query('SELECT * FROM tareas', (err, results) => {
  if (err) {
  console.error('Error al ejecutar la consulta: ', err);
  res.status(500).send('Error en la consulta');
  return;
  }
  // Enviar los resultados de la consulta como respuesta en formato JSON
  res.json(results);
  });
  
  });

  //-------------------------------------


// Configurar el puerto en el que se escucharán las solicitudes
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app;