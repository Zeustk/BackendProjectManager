const express = require("express");
const path = require('path');
const fs = require('fs');
const upload = require('../app.js'); // Importar multer desde app.js
const { url } = require("inspector");

const router = express.Router();



module.exports = function (servicio) {


   router.post('/api/addTarea', upload.single('pdf'), async (req, res) => {

      try {
         const { Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, PorcentajeTarea, Id_Proyecto, Id_Usuario, urlPdf } = req.body;

         console.log(urlPdf);
         // Verificar si se ha enviado un archivo
         if (!req.body.pdf) {
           return res.status(400).json({ error: 'No se ha enviado ningún archivo PDF' });
         }
     
         // Obtener el archivo desde el cuerpo de la solicitud
         const pdfData = req.body.pdf;
         const pdfBuffer = Buffer.from(pdfData, 'base64');
     
         // Crear un nombre de archivo único
         const filename = Date.now() + '.pdf';
         const filePath = path.join(__dirname, 'pdfTareas', filename);
     
         // Guardar el archivo en disco
         fs.writeFileSync(filePath, pdfBuffer);
     
         // Ruta relativa del archivo en la carpeta pdfTareas
         const pdfRelativePath = path.join('pdfTareas', filename);

         const Tareas = await servicio.addTarea(Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, PorcentajeTarea, Id_Proyecto, Id_Usuario, urlPdf);

         res.status(200).json(Tareas);
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Error al guardar la tarea' });
      }
   });

   router.get('/api/getTarea/:id_Proyecto/:id_Usuario', async (req, res) => {

      const id_Usuario = req.params.id_Usuario;

      const id_Proyecto = req.params.id_Proyecto;

      const Tareas = await servicio.getTareas(id_Usuario, id_Proyecto);

      res.json(Tareas);
   })


   router.put('/api/UpdateTarea', async (req, res) => {

      const { Id_Tarea, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Porcentajetarea } = req.body

      const updateTarea = await servicio.UpdateTarea(Id_Tarea, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Porcentajetarea);


      res.json(updateTarea);
   })


   router.delete('/api/DeleteTarea/:Id_Tarea', async (req, res) => {

      const { Id_Tarea } = req.params

      const Deltarea = await servicio.DeleteTarea(Id_Tarea);

      res.json(Deltarea);
   })

   return router;
}
