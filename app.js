//get: sirve para devolver cosas
//post:recibir dato y guardalo en bd y devolver una respuesta a la app que ha enviado los datos
//put: toma los datos del front-end y los actualiza en una bd u otra cosa y devolver algo
//delete:toma la peticion y elimina algo dentro del servidor y devuelve una respuesa
 //LAS VARIABLES DE ENTORNO SIRVE PARA ADAPTARSE AL ENTORNO EN EL CUAL ESTÉ, POR EJEMPLO BASE DE DATOS,ETC

//app.all ejecuta antes teniendo en cuenta la ruta y con el next hace que sigan las otras app con esa ruta

//midleware: se ejecuta antes de todas las rutas



//Requires

const express = require("express"); //Constante que va a requerir el modulo express
const cors=require('cors') //PERMITE QUE SE COMUNIQUE BACK Y EL FRONT AUNQUE ESTEN EN DOMINIOS DIFERENTES
const path=require('path');
const DB = require('./db');
const morgan=require("morgan");
require('dotenv').config() //TOMA LA CONFIGURACION DE EL ARCHIVO .ENV



//Se crea el servidor, el servidor es app
const app = express() 

//CORS
app.use(cors());

//Importancion de modulo
const ControllerPerfiles=require('./Controllers/GestionPerfiles');
const ControllerDetalleProyecto=require('./Controllers/GestionDetalleProyecto');
const ControllerRol=require('./Controllers/GestionRol');
const ControllerProyecto=require('./Controllers/GestionProyecto');
const ControllerTareas=require('./Controllers/GestionTareas');
const ControllerUsuarios=require('./Controllers/GestionUsuarios');






//Instancias de los modulos
const serviciomPerfilesI=new ControllerPerfiles(DB);
const ServicioDetalleProyectoI=new ControllerDetalleProyecto(DB);
const servicioRolI=new ControllerRol(DB);
const servicioProyectoI=new ControllerProyecto(DB);
const servicioTareasI=new ControllerTareas(DB);
const servicioUsuariosI=new ControllerUsuarios(DB);



//Routes (API)
const PerfilesRoutes= require('./routes/GestionPerfilesRoutes')(serviciomPerfilesI); //Se le pasa el servicio con su base
const DetalleProyectoRoutes=require('./routes/GestionDetalleProyectoRoutes')(ServicioDetalleProyectoI);
const RolRoutes=require('./routes/GestionRolesRoutes')(servicioRolI);
const ProyectoRoutes=require('./routes/GestionProyectosRoutes')(servicioProyectoI);
const TareasRoutes=require('./routes/GestionTareasRoutes')(servicioTareasI);
const UsuariosRoutes=require('./routes/GestionUsuariosRoutes')(servicioUsuariosI);



//SETS

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));



//MIDLEWARE
app.use(express.json({ limit: '5mb' })); //Para que comprenda formato Json
app.use(express.text()) //Para que comprenda formato text
app.use(morgan('dev')); //ejecutar el midleware
app.use(express.urlencoded({extended:false})) //Para que entienda los datos de formulario y el extended significa que solo es texto, no es algo complicado
app.use('/public',express.static(path.join(__dirname,'public')))  


//ROUTES (Ejecucion)
app.use(PerfilesRoutes);
app.use(DetalleProyectoRoutes);
app.use(RolRoutes);
app.use(ProyectoRoutes);
app.use(TareasRoutes);
app.use(UsuariosRoutes);


//Directorio Publico
app.use(express.static('public'))


app.use((req, res) => {
    res.status(404).send('No se encontro tu pagina'
    )
})

 //Permite enviar archivos al front-end como html,css, javascrip (no cambian)

app.listen(process.env.PORT, () => {
    console.log(`Aplicacion en linea Puerto ${process.env.PORT}`)
}) //Corre la aplicacion por el puerto 3000


