const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addTarea', async (req, res) => {


      try {

         const { Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,PorcentajeTarea,Id_Proyecto,Id_Usuario,urlPdf} = req.body;

        

         const Tareas = await servicio.addTarea(Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,PorcentajeTarea,Id_Proyecto,Id_Usuario,urlPdf);

         

         res.status(200).json(Tareas)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getTarea/:id_Proyecto/:id_Usuario', async (req, res) => {

      const id_Usuario = req.params.id_Usuario;

      const id_Proyecto = req.params.id_Proyecto;

      const Tareas = await servicio.getTareas(id_Usuario,id_Proyecto);

      res.json(Tareas);
   })


   router.put('/api/UpdateTarea', async (req, res) => {

      const { Id_Tarea,Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,Porcentajetarea} = req.body

      const updateTarea = await servicio.UpdateTarea(Id_Tarea,Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,Porcentajetarea);


      res.json(updateTarea);
   })


   router.delete('/api/DeleteTarea/:Id_Tarea', async (req, res) => {

      const { Id_Tarea} = req.params

      const Deltarea = await servicio.DeleteTarea(Id_Tarea);

      res.json(Deltarea);
   })

   return router;
}
