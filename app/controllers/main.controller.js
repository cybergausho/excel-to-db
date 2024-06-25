const XLSX = require('xlsx');
const Data = require("../models/pac.model.js");

    // Nueva ruta para obtener los datos en formato JSON
    exports.findAll(async (req, res) => {
        try {
          const data = await Data.findAll();
          res.json(data);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error al obtener los datos');
        }
    });

    // Ruta para servir el formulario HTML
    exports.Welcome((req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
  
    // Ruta para cargar el archivo Excel
    exports.Cargar(async (req, res) => {
        try {
        const file = req.file;
        const workbook = XLSX.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
        for (const row of worksheet) {
            // Verificar cómo se etiquetan las columnas
            switch (row['W']) {
            case 'SI': case 'Si': case 'si':
                validbool= 1;
                break;
                default:
                validbool=0;
                break;
            }
            switch (row['X']) {
            case 'SI': case 'Si': case 'si':
                dictadbool= 1;
                break;
                default:
                dictadbool=0;
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
            dictado: dictadbool,
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
    
  