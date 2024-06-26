const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addUsuario', async (req, res) => {


      try {

         const { Email, Clave, Id_rol } = req.body;




         const Usuarios = await servicio.addUsuarios(Email, Clave, Id_rol);



         res.status(200).json(Usuarios)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getUsuarios', async (req, res) => {



      const Usuarios = await servicio.getUsuarios();

      res.json(Usuarios);
   });

   router.post('/api/getUsuarioBase', async (req, res) => {


      try {

         const { Email, Clave } = req.body;

         console.log(Clave);
         const UsuarioVerificar = await servicio.VerificarCorreoExistente(Email, Clave);

         res.status(200).json(UsuarioVerificar);

      } catch (error) {
         res.status(404).json(error);
      }
   });


   router.put('/api/UpdateUsuarios', async (req, res) => {

      const { Id_Usuario, Email, Clave} = req.body

      const updateUsuarios = await servicio.UpdateUsuarios(Id_Usuario, Email, Clave);


      res.json(updateUsuarios);
   })


   router.delete('/api/DeleteUsuarios/:Id_Usuario', async (req, res) => {

      const { Id_Usuario } = req.params

      const DelUsuario = await servicio.DeleteUsuarios(Id_Usuario);

      res.json(DelUsuario);
   })

   router.post('/api/getUsuarioConId', async (req, res) => {


      try {

         const { Email, Clave } = req.body;

         console.log(Clave);
         const UsuarioVerificar = await servicio.getUsuarioConId(Email, Clave);

         res.status(200).json(UsuarioVerificar);

      } catch (error) {
         res.status(404).json(error);
      }
   });

   router.get('/api/getUsuariosPorIdProyecto/:Id_Proyecto', async (req, res) => {

      const { Id_Proyecto } = req.params

      const usuarios = await servicio.getUsuariosPorProyectos(Id_Proyecto);

      res.json(usuarios);
   })


   return router;
}
