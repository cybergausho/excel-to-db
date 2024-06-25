/*
express: Framework web para crear el servidor.
multer: Middleware para manejar archivos subidos en solicitudes HTTP.
xlsx: Biblioteca para manipular archivos Excel.
sequelize: ORM para manejar la base de datos.
sqlite3: Manejador de base de datos SQLite (puedes cambiarlo a otro DBMS según tus necesidades).
*/
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importar el paquete cors

const routes = require('./routes/routes');
const multer = require('multer');
// Configuración de Multer
const upload = multer({ dest: 'uploads/' });


const port = 3000;
app.use(express.json());
app.use('/api', routes);


// Habilitar CORS para todas las rutas
app.use(cors());

// Configuración de Sequelize para MySQL
const sequelize = new Sequelize('pac', 'root', 'Aced*1997', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

// Verificar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

// Sincronizar la base de datos
sequelize.sync();

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://192.168.10.132:${port}`);
});




