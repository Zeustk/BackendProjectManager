class ServicioPerfiles {

    constructor(DB) {
        this.DB = DB;
    }


    async addPerfiles(Id_Perfil,Nombre_Completo,Email,Numero_De_Proyecto,Estado,Id_Usuario) {
        try {

           
            Disponible="Si";

            const sql = "INSERT INTO Perfiles(Id_Rol,Nombre,Prioridad) VALUES (NEXTVAL('secuenciaproyectos'), ?,?, ?, ?, ?,?)";
    
            await this.DB.Open(sql, [Id_Perfil,Nombre_Completo,Email,Numero_De_Proyecto,Estado,Id_Usuario,Disponible]);
    
            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }
    

    async getPerfiles() {
        try {
            const sql = "select * from Perfiles";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Id_Perfil": propiedad.Id_Perfil,
                    "Nombre_Completo": propiedad.Nombre_Completo,
                    "Email": propiedad.Email,
                    "Numero_De_Proyecto": propiedad.Numero_De_Proyecto,
                    "Estado": propiedad.Estado,
                    "Id_Usuario": propiedad.Id_Usuario
                }));
            } else {
                
                return [];
            }
        } catch (err) {
            
            console.error(err);
            return 'Error de consulta';
        }
    }
    


    async UpdatePerfiles(Id_Perfil,Nombre_Completo,Email,Numero_De_Proyecto,Estado,Id_Usuariod) {

        try { 
            
            
            
            const sql = "update Perfiles set Nombre=?,Prioridad=? where Id_Rol=?";

            await this.DB.Open(sql, [Id_Perfil,Nombre_Completo,Email,Numero_De_Proyecto,Estado,Id_Usuariod]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


    async DeletePerfiles(Id_Perfil) {

        try {

            const sql = "update Perfile set Disponible='NO' where Id_Rol=?";

            await this.DB.Open(sql, [Id_Perfil], true);

            return ('Eliminado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al Eliminar');
        }

    }


}

module.exports = ServicioPerfiles;