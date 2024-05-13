class ServicioTareas {

    constructor(DB) {
        this.DB = DB;
    }


    async addTarea(Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,Porcentajetarea,Id_Proyecto,Id_usuario) {
        try {

            const Disponible="SI";


            const sql = "INSERT INTO TAREAS(Id_Tarea, Nombre, Fecha_Inicio, Fecha_Finalizacion,Descripcion,PorcentajeTarea,Id_Proyecto,Id_Usuario,Disponible) VALUES (NEXTVAL('secuenciatareas'), ?,?, ?, ?, ?,?,?,?)";
    
            await this.DB.Open(sql, [Nombre, Fecha_Inicio, Fecha_Finalizacion,Descripcion,Porcentajetarea,Id_Proyecto,Id_usuario,Disponible]);
    
            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }
    

    async getTareas(id_Usuario,id_Proyecto) {
        try {
            const sql = "select *from tareas where id_proyecto=? and id_usuario=?";
            let result = await this.DB.Open(sql, [id_Proyecto,id_Usuario]);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Id_Tarea": propiedad.id_tarea,
                    "Nombre": propiedad.nombre,
                    "Fecha_Inicio": propiedad.fecha_inicio,
                    "Fecha_Finalizacion": propiedad.fecha_finalizacion,
                    "Descripcion": propiedad.descripcion,
                    "PorcentajeTarea":propiedad.porcentajetarea,
                    "Id_Proyecto":propiedad.id_proyecto,
                    "Id_usuario":propiedad.id_usuario,
                    "Disponible":propiedad.disponible
                    
                }));
            } else {
                
                return [];
            }
        } catch (err) {
            
            console.error(err);
            return 'Error de consulta ' +err;
        }
    }
    


    async UpdateTareas(Id_Tarea,Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,Porcentajetarea) {

        try { 
            
            
            
            const sql = "update Tareas set Nombre=?,Fecha_Inicio=?,Fecha_Finalizacion=?,Descripcion=?,Porcentajetarea=? where Id_Tarea=?";

            await this.DB.Open(sql, [Id_Tarea, Nombre, Fecha_Inicio, Fecha_Finalizacion,Descripcion,Porcentajetarea]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


    async DeleteTareas(Id_Tarea) {

        try {

            const sql = "update Tareas set Disponible='NO' where Id_Tarea=?";

            await this.DB.Open(sql, [Id_Tarea], true);

            return ('Eliminado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al Eliminar');
        }

    }


}

module.exports = ServicioTareas;