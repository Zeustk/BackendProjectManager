const fs = require('fs');
class ServicioEntregas {

    constructor(DB) {
        this.DB = DB;
    }




    async addEntrega(Informe, UrlPdfEntrega, Id_Tarea) {
        try {

            const Disponible = "SI";



            const sql = "INSERT INTO Entregas(Id_Entrega, Informe, UrlPdfEntrega, Id_Tarea,Disponible) VALUES (NEXTVAL('secuenciaentregas'), ?,?, ?, ?)";

           

            await this.DB.Open(sql, [Informe, UrlPdfEntrega, Id_Tarea,Disponible]);

            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }


    async getTareas(id_Usuario, id_Proyecto) {
        try {
            const sql = "select * from tareas where id_proyecto=? and id_usuario=?";

            let result = await this.DB.Open(sql, [id_Proyecto, id_Usuario]);

            if (result && result.length > 0) {
                return await Promise.all(result.map(async (propiedad) => {
                    let pdfBase64 = null;
                    if (propiedad.urlpdf) {
                        try {
                            const pdfBuffer = fs.readFileSync(propiedad.urlpdf);
                            pdfBase64 = pdfBuffer.toString('base64');
                        } catch (err) {
                            console.error(`Error al leer el archivo PDF en la ruta ${propiedad.urlpdf}: `, err);
                        }
                    }

                    return {
                        "Id_Tarea": propiedad.id_tarea,
                        "Nombre": propiedad.nombre,
                        "Fecha_Inicio": propiedad.fecha_inicio,
                        "Fecha_Finalizacion": propiedad.fecha_finalizacion,
                        "Descripcion": propiedad.descripcion,
                        "PorcentajeTarea": propiedad.porcentajetarea,
                        "Id_Proyecto": propiedad.id_proyecto,
                        "Id_usuario": propiedad.id_usuario,
                        "Disponible": propiedad.disponible,
                        "urlPdf": pdfBase64 // Enviar el PDF en formato base64
                    };
                }));
            } else {
                return [];
            }
        } catch (err) {
            console.error(err);
            return 'Error de consulta ' + err;
        }
    }




    async UpdateTareas(Id_Tarea, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Porcentajetarea) {

        try {



            const sql = "update Tareas set Nombre=?,Fecha_Inicio=?,Fecha_Finalizacion=?,Descripcion=?,Porcentajetarea=? where Id_Tarea=?";

            await this.DB.Open(sql, [Id_Tarea, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Porcentajetarea]);

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
    async tareaFueEntregada(Id_Tarea) {
        try {
   
            const sql = "SELECT *FROM Entregas WHERE Id_Tarea = ?";
            let perfil = await this.DB.Open(sql, [Id_Tarea]);
    
            if (perfil && perfil.length > 0) {
               return true;
            } else {
                return false; // No se encontraron registros
            }
        } catch (err) {
            console.log(err);
            return 'Error de consulta';
        }
    }


}

module.exports = ServicioEntregas;