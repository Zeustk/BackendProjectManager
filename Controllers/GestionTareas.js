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
    

    async getTareas() {
        try {
            const sql = "select * from Tareas";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Id_Tarea": propiedad.Id_Tarea,
                    "Nombre": propiedad.Nombre,
                    "Fecha_Inicio": propiedad.Fecha_Inicio,
                    "Fecha_Finalizacion": propiedad.Fecha_Finalizacion,
                    "Descripcion": propiedad.Descripcion,
                    "Porcentajetarea":propiedad.Porcentajetarea,
                    "Id_Proyecto":propiedad.Id_Proyecto,
                    "Id_usuario":propiedad.Id_usuario,
                    
                }));
            } else {
                
                return [];
            }
        } catch (err) {
            
            console.error(err);
            return 'Error de consulta';
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