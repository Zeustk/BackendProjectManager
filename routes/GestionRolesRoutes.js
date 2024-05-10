const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addRoles', async (req, res) => {


      try {

         const { Id_Rol,Nombre,Prioridad} = req.body;

         

        

         const Roles = await servicio.addRoles(Id_Rol,Nombre,Prioridad);

         

         res.status(200).json(Roles)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getRoles', async (req, res) => {

      const Roles = await servicio.getRoles();

      res.json(Roles);
   })


   router.put('/api/UpdateRoles', async (req, res) => {

      const { Id_Rol,Nombre,Prioridad} = req.body

      const updateRoles = await servicio.UpdateRoles(Id_Rol,Nombre,Prioridad);


      res.json(updateRoles);
   })


   router.delete('/api/DeleteTarea/:Id_Rol', async (req, res) => {

      const { Id_Rol} = req.params

      const DelRoles = await servicio.DeleteRoles(Id_Rol);

      res.json(DelRoles);
   })

   return router;
}
