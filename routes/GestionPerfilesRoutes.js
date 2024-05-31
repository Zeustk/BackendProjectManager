const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addPerfiles', async (req, res) => {


      try {

         const { Nombre_Completo,Numero_De_Proyecto,Estado,Id_Usuario} = req.body;

         

        

         const Perfiles = await servicio.addPerfiles(Nombre_Completo,Numero_De_Proyecto,Estado,Id_Usuario);

         

         res.status(200).json(Perfiles)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getPerfiles', async (req, res) => {

      const Perfiles = await servicio.getPerfiles();

      res.json(Perfiles);
   })


   router.put('/api/UpdatePerfiles', async (req, res) => {

      const { Id_Perfil,Nombre_Completo,Email,Numero_De_Proyecto,Estado,Id_Usuario} = req.body

      const updatePerfil = await servicio.UpdatePerfiles(Id_Perfil,Nombre_Completo,Email,Numero_De_Proyecto,Estado,Id_Usuario);


      res.json(updatePerfil);
   })


   router.delete('/api/DeletePerfiles/:Id_Perfil', async (req, res) => {

      const { Id_Perfil} = req.params

      const DelPerfil = await servicio.DeletePerfiles(Id_Perfil);

      res.json(DelPerfil);
   })


   router.post('/api/getPerfilPorIdUsuario/:Id_Usuario',async(req,res)=>{
       
      
      try {
           
        const {Id_Usuario}=req.params;
        
        console.log('hola');
        console.log(Id_Usuario);
        const perfil=await servicio.getPerfilConUsuarioId(Id_Usuario);
        
        res.status(200).json(perfil);
        
      } catch (error) {
        res.status(404).json(error);
      }
  });




   return router;
}
