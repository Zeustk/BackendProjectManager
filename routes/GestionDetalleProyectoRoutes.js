const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addDetalleproyecto', async (req, res) => {


      try {

         const {Id_Usuario,PorcentajeProyecto,Id_LiderProyecto} = req.body;

         

        

         const Detalles = await servicio.addDetalleproyecto(Id_Usuario,PorcentajeProyecto,Id_LiderProyecto);

         

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

      const { Id_Detalle,Id_Usuario,Id_Proyecto,PorcentajeProyecto} = req.body

      const updateRDetalles = await servicio.UpdateDetalleproyecto(Id_Detalle,Id_Usuario,Id_Proyecto,PorcentajeProyecto);


      res.json(updateRDetalles);
   })


   router.delete('/api/DeleteDetalleproyecto/:Id_Detalle', async (req, res) => {

      const { Id_Detalle} = req.params

      const DelDetalle = await servicio.DeleteDetalleproyecto(Id_Detalle);

      res.json(DelDetalle);
   })

   return router;
}
