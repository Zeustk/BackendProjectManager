const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/AddProyecto', async (req, res) => {


      try {

         const { Lider_Proyecto, Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,Id_Estado,PorcentajeProyecto } = req.body;

   

         const Answer = await servicio.addProyecto(Lider_Proyecto, Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,Id_Estado,PorcentajeProyecto);

     

         res.status(200).json(Answer)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getProyecto/:id_Usuario', async (req, res) => {

     const id_Usuario = req.params.id_Usuario;

      const Proyectos = await servicio.getProyecto(id_Usuario);


      res.json(Proyectos);
   })


   router.put('/api/UpdateProyecto', async (req, res) => {

      const { Id_Proyecto,Lider_Proyecto,Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion } = req.body

      const Answer = await servicio.UpdateProyecto(Id_Proyecto,Lider_Proyecto,Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion);


      res.json(Answer);
   })


   router.delete('/api/DeleteProyecto/:Id_Proyecto', async (req, res) => {

      const { Id_Proyecto} = req.params
     

      const Answer = await servicio.DeleteProyecto(Id_Proyecto);

      res.json(Answer);
   })

   router.get('/api/getProyectoByLiderProyecto/:id_LiderProyecto', async (req, res) => {

      const id_LiderProyecto = req.params.id_LiderProyecto;
 
       const Proyectos = await servicio.getProyectoPorLider(id_LiderProyecto);
 
 
       res.json(Proyectos);
    })

    router.get('/api/getInformeProyectoById/:id_Proyecto', async (req, res) => {

      const id_Proyecto = req.params.id_Proyecto;

      console.log('hola');
 
       const Proyectos = await servicio.getInformebyId(id_Proyecto);
 
 
       res.json(Proyectos);
    })


    router.get('/api/getInformeGeneral/:id_LiderProyecto', async (req, res) => {

      const Id_LiderProyecto= req.params.id_LiderProyecto;

 
       const Proyectos = await servicio.getInformeGeneralbyLider(Id_LiderProyecto);
 
 
       res.json(Proyectos);
    })

   return router;
}
