const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addTarea', async (req, res) => {


      try {

         const { Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,PorcentajeTarea,Id_Proyecto,Id_Usuario} = req.body;

        console.log(Nombre);
        console.log(Fecha_Inicio);
        console.log(Fecha_Finalizacion);
        console.log(Descripcion);
        console.log(PorcentajeTarea);
        console.log(Id_Proyecto);
        console.log(Id_Usuario);
        

         const Tareas = await servicio.addTarea(Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,PorcentajeTarea,Id_Proyecto,Id_Usuario);

         

         res.status(200).json(Tareas)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getTarea', async (req, res) => {

      const Tareas = await servicio.getTareas();

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
