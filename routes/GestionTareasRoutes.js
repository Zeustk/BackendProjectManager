const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addTarea', async (req, res) => {


      try {

         const { Id_Tarea,Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,Porcentajetarea,Id_Proyecto,Id_usuario} = req.body;

         console.log(Lider_Proyecto);

        

         const Tareas = await servicio.addTarea(Id_Tarea,Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,Porcentajetarea,Id_Proyecto,Id_usuario);

         

         res.status(200).json(Tareas)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getTarea', async (req, res) => {

      const Tareas = await servicio.getTarea();

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
