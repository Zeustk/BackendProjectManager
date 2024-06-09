class ServicioDetallesProyecto {

    constructor(DB) {
        this.DB = DB;
    }


    async addDetalleproyecto(Id_Usuario,Id_Proyecto,Id_LiderProyecto) {
        try {


            const Disponible="SI";
            let Id_ProyectoReal=-1;

            if (Id_Proyecto==-1){

                Id_ProyectoReal=await this.getIdActualproyecto();

            }
            else{
                Id_ProyectoReal=Id_Proyecto;
            }
         

            const sql = "INSERT INTO detalleproyectousuarios(Id_Detalle,Id_Usuario,Id_Proyecto,Id_LiderProyecto,Disponible) VALUES (NEXTVAL('secuenciadetalleproyectousuario'),?,?,?,?)";

      
          

            await this.DB.Open(sql, [Id_Usuario, Id_ProyectoReal, Id_LiderProyecto,Disponible]);

            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }


    async getDetalleproyecto() {
        try {
            const sql = "select * from detalleproyectousuarios";
            let result = await this.DB.Open(sql, []);

            if (result && result.length > 0) {

                return result.map(propiedad => ({
                    "Id_Detalle": propiedad.Id_Detalle,
                    "Id_Usuario": propiedad.Id_Usuario,
                    "Id_Proyecto": propiedad.Id_Proyecto,
                }));
            } else {

                return [];
            }
        } catch (err) {

            console.error(err);
            return 'Error de consulta';
        }
    }



    async UpdateDetalleproyecto(Id_Detalle, Id_Usuario, Id_Proyecto) {

        try {



            const sql = "update detalleproyectousuarios set Id_Usuario=? ,Id_Proyecto=? where Id_Detalle=?";

            await this.DB.Open(sql, [Id_Detalle, Id_Usuario, Id_Proyecto]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


    async DeleteUsuarioproyecto(Id_Usuario) {

        try {

            //TU MIRAS AVER QUE ACTUALIZAS AQUI //POR QUE DISPONOBLE NO ESTA 
            const sql = "update detalleproyectousuarios set Disponible='NO' where Id_Usuario=?";

            await this.DB.Open(sql, [Id_Usuario], true);

            return ('Eliminado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al Eliminar');
        }

    }

    async getIdActualproyecto() {
        try {
            const sql = "SELECT last_value FROM secuenciaproyectos";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                // Devolver solo el valor del ID
                return result[0].last_value;
            } else {
                // Si no se encuentra ningún resultado, devolver null o un valor predeterminado
                return null;
            }
        } catch (err) {
            console.error(err);
            return 'ID NO ENCONTRADO';
        }
    }

    async getproyectosLiderByUsuario(Id_Usuario) {
        try {
            const sql = "select DISTINCT(id_proyecto) from detalleproyectousuarios where id_liderproyecto=?";
            let result = await this.DB.Open(sql, [Id_Usuario]);

            

            if (result && result.length > 0) {


                return result.map(propiedad => ({
                    "Id_Proyecto": propiedad.id_proyecto,
                 
                }));
            } else {

                

                return [];
            }
        } catch (err) {

            console.error(err);
            return 'Error de consulta';
        }
    }




}

module.exports = ServicioDetallesProyecto;