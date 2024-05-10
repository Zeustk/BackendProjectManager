class ServicioRol {

    constructor(DB) {
        this.DB = DB;
    }


    async addRoles(Id_Rol,Nombre,Prioridad) {
        try {

           
            Disponible="Si";

            const sql = "INSERT INTO roles(Id_Rol,Nombre,Prioridad) VALUES (NEXTVAL('secuenciaproyectos'), ?,?, ?, ?, ?,?)";
    
            await this.DB.Open(sql, [Id_Rol,Nombre,Prioridad,Disponible]);
    
            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }
    

    async getRoles() {
        try {
            const sql = "select * from roles";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Id_Rol": propiedad.Id_Rol,
                    "Nombre": propiedad.Nombre,
                    "Prioridad": propiedad.Prioridad
                }));
            } else {
                
                return [];
            }
        } catch (err) {
            
            console.error(err);
            return 'Error de consulta';
        }
    }
    


    async UpdateRoles(Id_Rol,Nombre,Prioridad) {

        try { 
            
            
            
            const sql = "update roles set Nombre=?,Prioridad=? where Id_Rol=?";

            await this.DB.Open(sql, [Id_Rol,Nombre,Prioridad]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


    async DeleteRoles(Id_Rol) {

        try {

            const sql = "update roles set Disponible='NO' where Id_Rol=?";

            await this.DB.Open(sql, [Id_Rol], true);

            return ('Eliminado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al Eliminar');
        }

    }


}

module.exports = ServicioRol;