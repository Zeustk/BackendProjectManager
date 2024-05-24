const express = require("express");
const path = require('path');
const fs = require('fs');

const router = express.Router();



module.exports = function (servicio) {


   router.post('/api/addTarea', async (req, res) => {

      try {
         const { Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, PorcentajeTarea, Id_Proyecto, Id_Usuario, urlPdf } = req.body;

         const pdfBase64Content = req.body.urlPdf; // Aquí asumo que el contenido base64 se encuentra en req.body.urlPdf

         
         // Decodificar el contenido base64 para obtener los bytes del archivo original
         const pdfBuffer = Buffer.from(pdfBase64Content, 'base64');

         const uniqueFilename = Date.now() + '_' + Math.random().toString(36).substring(7) + '.pdf';
         
      

         // Especificar la ruta donde deseas guardar el archivo
         const filePath = path.join('uploads/pdfTareas', uniqueFilename); // Cambia esto según la ruta y el nombre de archivo que desees

         console.log(filePath);
         // Escribir los bytes del archivo en el archivo en el sistema de archivos del servidor
         fs.writeFileSync(filePath, pdfBuffer);

       

         const Tareas = await servicio.addTarea(Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, PorcentajeTarea, Id_Proyecto, Id_Usuario, filePath);

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
