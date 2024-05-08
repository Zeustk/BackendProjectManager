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
const ControllerMarcas=require('./Controllers/GestionMarca');
const ControllerClientes=require('./Controllers/GestionCliente');
const ControllerTipoVehiculo=require('./Controllers/GestionTipoVehiculo');
const ControllerProyecto=require('./Controllers/GestionProyecto');
const ControllerVehiculo=require('./Controllers/GestionVehiculo');
const ControllerReserva=require('./Controllers/GestionReserva');
const ControllerEmpleado=require('./Controllers/GestionEmpleado');
const ControllerCargo=require('./Controllers/GestionCargos');
const ControllerAlquiler=require('./Controllers/GestionAlquiler');





//Instancias de los modulos
const serviciomarcaI=new ControllerMarcas(DB);
const ServicioClienteI=new ControllerClientes(DB);
const servicioTipoVehiculoI=new ControllerTipoVehiculo(DB);
const servicioProyectoI=new ControllerProyecto(DB);
const servicioVehiculoI=new ControllerVehiculo(DB);
const servicioReservaI=new ControllerReserva(DB);
const servicioEmpleadoI=new ControllerEmpleado(DB);
const servicioAlquilerI=new ControllerAlquiler(DB);
const servicioCargoI=new ControllerCargo(DB);


//Routes (API)
const MarcasRoutes= require('./routes/GestionMarcasRoutes')(serviciomarcaI); //Se le pasa el servicio con su base
const ClienteRoutes=require('./routes/GestionClientesRoutes')(ServicioClienteI);
const TipoVehiculoRoutes=require('./routes/GestionTipoVehiculoRoutes')(servicioTipoVehiculoI);
const ProyectoRoutes=require('./routes/GestionProyectosRoutes')(servicioProyectoI);
const VehiculoRoutes=require('./routes/GestionVehiculosRoutes')(servicioVehiculoI);
const ReservaRoutes=require('./routes/GestionReservasRoutes')(servicioReservaI);
const EmpleadoRoutes=require('./routes/GestionEmpleadosRoutes')(servicioEmpleadoI);
const AlquilerRoutes=require('./routes/GestionAlquileresRoutes')(servicioAlquilerI);
const CargoRoutes=require('./routes/GestionCargosRoutes')(servicioCargoI);



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
app.use(MarcasRoutes);
app.use(ClienteRoutes);
app.use(TipoVehiculoRoutes);
app.use(ProyectoRoutes);
app.use(VehiculoRoutes);
app.use(ReservaRoutes);
app.use(EmpleadoRoutes);
app.use(AlquilerRoutes);
app.use(CargoRoutes);

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


