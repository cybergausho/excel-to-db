const sql = require("./db.js");

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
  
  module.exports = Data;