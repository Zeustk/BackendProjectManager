const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addDetalleproyecto', async (req, res) => {


      try {

         const {Id_Usuario,Id_Proyecto,Id_LiderProyecto} = req.body;
      
        
         const Detalles = await servicio.addDetalleproyecto(Id_Usuario,Id_Proyecto,Id_LiderProyecto);

         

         res.status(200).json(Detalles)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getDetalleproyecto', async (req, res) => {

      const Detalles = await servicio.getDetalleproyecto();

      res.json(Detalles);
   })


   router.put('/api/UpdateDetalleproyecto', async (req, res) => {

      const { Id_Detalle,Id_Usuario,Id_Proyecto} = req.body

      const updateRDetalles = await servicio.UpdateDetalleproyecto(Id_Detalle,Id_Usuario,Id_Proyecto);


      res.json(updateRDetalles);
   })


   router.delete('/api/DeleteUsuarioDeproyecto/:Id_Usuario', async (req, res) => {

      const { Id_Usuario} = req.params

      const DeleteUsuario = await servicio.DeleteUsuarioproyecto(Id_Usuario);

      res.json(DeleteUsuario);
   })

   router.get('/api/getLiderProyectos/:Id_Usuario', async (req, res) => {

      const { Id_Usuario} = req.params

      const Detalles = await servicio.getproyectosLiderByUsuario(Id_Usuario);

      res.json(Detalles);
   })

   return router;
}
