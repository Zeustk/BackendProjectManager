class ServicioPerfiles {

    constructor(DB) {
        this.DB = DB;
    }


    async addPerfiles(Nombre_Completo,Numero_De_Proyecto,Estado,Id_Usuario) {
        try {

           
           const Disponible="SI";

            const sql = "INSERT INTO Perfiles(Id_Perfil,Nombre_Completo,Numero_Proyectos,Estado,Id_Usuario,Disponible) VALUES (NEXTVAL('secuenciaperfiles'),?, ?, ?, ?,?)";
    
            await this.DB.Open(sql, [Nombre_Completo,Numero_De_Proyecto,Estado,Id_Usuario,Disponible]);
    
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

    async getPerfilConUsuarioId(Id_Usuario) {
        try {
            console.log(Id_Usuario);
            const sql = "SELECT *FROM perfiles WHERE Id_Usuario = ?";
            let perfil = await this.DB.Open(sql, [Id_Usuario]);
    
            if (perfil && perfil.length > 0) {
                return {
                    "Id_Perfil": perfil[0].id_perfil,
                    "Nombre_Completo": perfil[0].nombre_completo,
                    "Numero_De_Proyecto": perfil[0].numero_proyectos,
                    "Estado": perfil[0].estado,
                    "Id_Usuario":perfil[0].id_usuario,
                    "Disponible":perfil[0].disponible,

        
                };
            } else {
                return null; // No se encontraron registros
            }
        } catch (err) {
            console.log(err);
            return 'Error de consulta';
        }
    }
    

}

module.exports = ServicioPerfiles;