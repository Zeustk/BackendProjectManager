class ServicioDetallesProyecto {

    constructor(DB) {
        this.DB = DB;
    }


    async addDetalleproyecto(Id_Usuario, PorcentajeProyecto,Id_LiderProyecto) {
        try {


          const Id_Proyecto=await this.getIdActualproyecto();




            const sql = "INSERT INTO detalleproyectousuarios(Id_Detalle,Id_Usuario,Id_Proyecto,PorcentajeProyecto,Id_LiderProyecto) VALUES (NEXTVAL('secuenciadetalleproyectousuario'),?, ?,?,?)";

            await this.DB.Open(sql, [Id_Usuario, Id_Proyecto, PorcentajeProyecto,Id_LiderProyecto]);

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
                    "PorcentajeProyecto": propiedad.PorcentajeProyecto
                }));
            } else {

                return [];
            }
        } catch (err) {

            console.error(err);
            return 'Error de consulta';
        }
    }



    async UpdateDetalleproyecto(Id_Detalle, Id_Usuario, Id_Proyecto, PorcentajeProyecto) {

        try {



            const sql = "update detalleproyectousuarios set PorcentajeProyecto=?, Id_Usuario=? ,Id_Proyecto=? where Id_Detalle=?";

            await this.DB.Open(sql, [Id_Detalle, Id_Usuario, Id_Proyecto, PorcentajeProyecto]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


    async DeleteDetalleproyecto(Id_Detalle) {

        try {

            //TU MIRAS AVER QUE ACTUALIZAS AQUI //POR QUE DISPONOBLE NO ESTA 
            const sql = "update detalleproyectousuarios set Disponible='NO' where Id_Detalle=?";

            await this.DB.Open(sql, [Id_Detalle], true);

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




}

module.exports = ServicioDetallesProyecto;