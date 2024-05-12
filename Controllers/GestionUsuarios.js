class ServiciosUsuarios {

    constructor(DB) {
        this.DB = DB;
    }


    async addUsuarios(Email,Clave,Id_rol) {
        try {

            const Disponible="SI";


            const sql = "INSERT INTO Usuarios(Id_Usuario,Email,Clave,Id_rol,Disponible) VALUES (NEXTVAL('secuenciaproyectos'),?, ?, ?,?)";
    
            await this.DB.Open(sql, [Email,Clave,Id_rol,Disponible]);
    
            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }
    

    async getUsuarios() {
        try {
            const sql = "select * from Usuarios";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Id_Usuario": propiedad.id_usuario,
                    "Email": propiedad.email,
                    "Clave": propiedad.clave,
                    "Id_rol": propiedad.id_rol
                
                }));
            } else {
                
                return [];
            }
        } catch (err) {
            
            console.error(err);
            return 'Error de consulta';
        }
    }
    


    async UpdateUsuarios(Id_Usuario,Email,Clave,Id_rol) {

        try { 
            
            
            
            const sql = "update Usuarios set Email=?,Clave=?,Id_rol=? where Id_Usuario=?";

            await this.DB.Open(sql, [Id_Usuario,Email,Clave,Id_rol]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


    async DeleteUsuarios(Id_Usuario) {

        try {
           //no se actualizaras aqui !! //
            const sql = "update Usuarios set Disponible='NO' where Id_Usuario=?";

            await this.DB.Open(sql, [Id_Usuario], true);

            return ('Eliminado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al Eliminar');
        }

    }

    async  VerificarCorreoExistente(Email,Clave) {
        try {
            
            
            const sql = "SELECT * FROM usuarios WHERE Email = ? and  Clave = ?";
            const result = await this.DB.Open(sql, [Email,Clave]);
    
            if (result && result.length > 0) {
                
                return true;
            } else {
                return false; 
            }
        } catch (err) {
            
            throw new Error('Error al verificar el correo en la base de datos');
        }
    }
    


}

module.exports = ServiciosUsuarios;