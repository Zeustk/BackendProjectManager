const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addUsuarios', async (req, res) => {


      try {

         const { Id_Usuario,Email,Clave,Id_rol} = req.body;

         

        

         const Usuarios = await servicio.addUsuarios(Id_Usuario,Email,Clave,Id_rol);

         

         res.status(200).json(Usuarios)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getUsuarios', async (req, res) => {

      const Usuarios = await servicio.getUsuarios();

      res.json(Usuarios);
   })


   router.put('/api/UpdateUsuarios', async (req, res) => {

      const { Id_Usuario,Email,Clave,Id_rol} = req.body

      const updateUsuarios = await servicio.UpdateUsuarios(Id_Usuario,Email,Clave,Id_rol);


      res.json(updateUsuarios);
   })


   router.delete('/api/DeleteUsuarios/:Id_Usuario', async (req, res) => {

      const { Id_Usuario} = req.params

      const DelUsuario = await servicio.DeleteUsuarios(Id_Usuario);

      res.json(DelUsuario);
   })

   return router;
}