/*
express: Framework web para crear el servidor.
multer: Middleware para manejar archivos subidos en solicitudes HTTP.
xlsx: Biblioteca para manipular archivos Excel.
sequelize: ORM para manejar la base de datos.
sqlite3: Manejador de base de datos SQLite (puedes cambiarlo a otro DBMS según tus necesidades).
*/

const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors'); // Importar el paquete cors

// Configuración de Express
const app = express();
const port = 3000;

// Habilitar CORS para todas las rutas
app.use(cors());

// Configuración de Multer
const upload = multer({ dest: 'uploads/' });

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

// Definición del modelo de datos
const Data = sequelize.define('Data', {
  ffss: DataTypes.STRING,
  nro_orden: DataTypes.INTEGER,
  tematica: DataTypes.STRING,
  edicion: DataTypes.INTEGER,
  nombre_actividad: DataTypes.STRING,
  dependencia: DataTypes.STRING,
  responsable_actividad: DataTypes.STRING,
  lugar_realizacion: DataTypes.STRING,
  capacitadores: DataTypes.STRING,
  perfil_a_capacitar: DataTypes.STRING,
  cantidad_a_capacitar: DataTypes.INTEGER,
  modalidad: DataTypes.STRING,
  fecha_inicio: DataTypes.DATE,
  fecha_fin: DataTypes.DATE,
  fundamentacion: DataTypes.STRING,
  objetivos_grales: DataTypes.STRING,
  objetivos_especificos: DataTypes.STRING,
  contenidos: DataTypes.STRING,
  bibliografia: DataTypes.STRING,
  control_riesgos: DataTypes.STRING,
  cantidad_horas: DataTypes.INTEGER,
  tipo_certificacion: DataTypes.STRING,
  validacion: DataTypes.BOOLEAN,
  dictado: DataTypes.BOOLEAN,
  observacion_no_dictado: DataTypes.STRING,
  cantidad_vacantes: DataTypes.INTEGER,
  capacitado_real: DataTypes.INTEGER,
  subtotal_oficiales: DataTypes.INTEGER,
  subtotal_suboficiales: DataTypes.INTEGER,
  subtotal_civiles: DataTypes.INTEGER,
  subtotal_becarios: DataTypes.INTEGER,
  dictamen_sspyf: DataTypes.STRING,
  observacion_sspyf: DataTypes.STRING,
  anio_lectivo: DataTypes.INTEGER
}, {
  tableName: 'pac' // Nombre de la tabla en la base de datos
});

// Sincronizar la base de datos
sequelize.sync();

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para cargar el archivo Excel
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (const row of worksheet) {
      // Verificar cómo se etiquetan las columnas
      switch (row['W']) {
        case 'SI':
          validbool= 1;
          break;
          default:
            validbool=0;
          break;
      }
      await Data.create({
        ffss: row['A'],
        nro_orden: row['B'],
        tematica: row['C'],
        edicion: row['D'],
        nombre_actividad: row['E'],
        dependencia: row['F'],
        responsable_actividad: row['G'],
        lugar_realizacion: row['H'],
        capacitadores: row['I'],
        perfil_a_capacitar: row['J'],
        cantidad_a_capacitar: row['K'],
        modalidad: row['L'],
        fecha_inicio: row['M'],
        fecha_fin: row['N'],
        fundamentacion: row['O'],
        objetivos_grales: row['P'],
        objetivos_especificos: row['Q'],
        contenidos: row['R'],
        bibliografia: row['S'],
        control_riesgos: row['T'],
        cantidad_horas: row['U'],
        tipo_certificacion: row['V'],
        validacion: validbool,
        dictado: row['X'],
        observacion_no_dictado: row['Y'],
        cantidad_vacantes: row['Z'],
        capacitado_real: row['AA'],
        subtotal_oficiales: row['AB'],
        subtotal_suboficiales: row['AC'],
        subtotal_civiles: row['AD'],
        subtotal_becarios: row['AE'],
        dictamen_sspyf: row['AF'],
        observacion_sspyf: row['AG'],
        anio_lectivo: row['AH']

      });
    }

    res.send('Archivo cargado y datos almacenados en la base de datos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el archivo');
  } finally {
    // Eliminar el archivo subido después de procesarlo
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error al eliminar el archivo:', err);
      });
    }
  }
});


// Nueva ruta para obtener los datos en formato JSON
app.get('/data', async (req, res) => {
  try {
    const data = await Data.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos');
  }
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://192.168.10.132:${port}`);
});




