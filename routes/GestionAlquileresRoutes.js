const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/AddAlquiler', async (req, res) => {


      try {

         const { Fecha_Emision, Fecha_Contrato, KmEmision, KmRecepcion, KmRecorridos, Placa_Vehiculo, Cc_Clientes, Id_Empleados, Valor_Inicial, Disponible, Cargos_Adicionales, Total, Fecha_Recepcion } = req.body;

         const FechaContrato = new Date(Fecha_Contrato);
         const FechaEmision = new Date(Fecha_Emision);

         if (KmEmision == 0 || Id_Empleados == 0 || Cc_Clientes == '' || FechaContrato < FechaEmision || Placa_Vehiculo == '') {
            return res.status(400).json('VERIFIQUE CAMPOS');
         }


         const Answer = await servicio.addAlquiler(Fecha_Emision, Fecha_Contrato, KmEmision, KmRecepcion, KmRecorridos, Placa_Vehiculo, Cc_Clientes, Id_Empleados, Valor_Inicial, Disponible, Cargos_Adicionales, Total, Fecha_Recepcion)

         console.log(Answer);

         res.status(200).json(Answer)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getAlquiler', async (req, res) => {

      const Alquileres = await servicio.getAlquiler();

      res.json(Alquileres);
   })


   router.put('/api/UpdateAlquiler', async (req, res) => {

      const { Id, Fecha_Recepcion, KmRecepcion } = req.body

      const Answer = await servicio.UpdateAlquiler(Id, Fecha_Recepcion, KmRecepcion);


      res.json(Answer);
   })


   router.delete('/api/DeleteAlquiler/:ID', async (req, res) => {

      const { ID } = req.params

      const Answer = await servicio.DeleteAlquiler(ID);

      res.json(Answer);
   })

   return router;
}

