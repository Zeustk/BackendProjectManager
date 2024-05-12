const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addUsuario', async (req, res) => {


      try {

         const { Email,Clave,Id_rol} = req.body;

         

      
         const Usuarios = await servicio.addUsuarios(Email,Clave,Id_rol);

         

         res.status(200).json(Usuarios)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getUsuarios', async (req, res) => {

      const Usuarios = await servicio.getUsuarios();

      res.json(Usuarios);
   });

   router.get('/api/getUsuarioBase',async(req,res)=>{
       
       try {
         
         const {Email}=req.body;
         const UsuarioVerificar=await servicio.VerificarCorreoExistente(Email);
          
         res.status(200).json(UsuarioVerificar);
         
       } catch (error) {
         res.status(404).json(error);
       }
   });


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
