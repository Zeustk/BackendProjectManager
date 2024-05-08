class ServicioProyectos {

    constructor(DB) {
        this.DB = DB;
    }


    async addProyecto(Lider_Proyecto, Nombre, Fecha_Inicio, Fecha_Finalizacion,Descripcion) {
        try {

            const Disponible="SI";


            const sql = "INSERT INTO Proyectos(Id_Proyecto, Lider_Proyecto, Nombre, Fecha_Inicio, Fecha_Finalizacion,Descripcion,Disponible) VALUES (NEXTVAL('secuenciaproyectos'), ?,?, ?, ?, ?,?)";
    
            await this.DB.Open(sql, [Lider_Proyecto, Nombre, Fecha_Inicio, Fecha_Finalizacion,Descripcion,Disponible]);
    
            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }
    

    async getProyecto() {
        try {
            const sql = "select * from Proyectos";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                // El resultado es válido, no necesitas mapearlo
                return result.map(propiedad => ({
                    "Id_Proyecto": propiedad.id_proyecto,
                    "Lider_Proyecto": propiedad.lider_proyecto,
                    "Nombre": propiedad.nombre,
                    "Fecha_Inicio": propiedad.fecha_inicio,
                    "Fecha_Finalizacion": propiedad.fecha_finalizacion,
                    "Descripcion":propiedad.descripcion,
                }));
            } else {
                // No se encontraron proyectos
                return [];
            }
        } catch (err) {
            // Manejar errores
            console.error(err);
            return 'Error de consulta';
        }
    }
    


    async UpdateProyecto(Id_Proyecto,Lider_Proyecto,Nombre, Fecha_Inicio,Fecha_Finalizacion,Descripcion) {

        try { 
            
            /* console.log(Id);
            console.log(Nombre);
            console.log(Precio);
            console.log(ValorDia); */
            
            const sql = "update Proyectos set Lider_Proyecto=?,Nombre=?,Fecha_Inicio=?,Fecha_Finalizacion=?,Descripcion=? where Id_Proyecto=?";

            await this.DB.Open(sql, [Lider_Proyecto,Nombre,Fecha_Inicio,Fecha_Finalizacion,Descripcion,Id_Proyecto]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


    async DeleteProyecto(Id_Proyecto) {

        try {

            const sql = "update Proyectos set Disponible='NO' where ID_Proyecto=?";

            await this.DB.Open(sql, [Id_Proyecto], true);

            return ('Eliminado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al Eliminar');
        }

    }


}

module.exports = ServicioProyectos;