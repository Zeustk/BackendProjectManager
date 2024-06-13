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
    async getEntrega(Id_Tarea) {
        try {
            const sql = "SELECT * FROM Entregas WHERE Id_Tarea = ? AND Disponible='SI'";
            let entrega = await this.DB.Open(sql, [Id_Tarea]);
    
            if (entrega && entrega.length > 0) {
                return await Promise.all(entrega.map(async (propiedad) => {
                    let pdfBase64 = null;
                    if (propiedad.urlpdfentrega) {
                        try {
                            const pdfBuffer = fs.readFileSync(propiedad.urlpdfentrega);
                            pdfBase64 = pdfBuffer.toString('base64');
                        } catch (err) {
                            console.error(`Error al leer el archivo PDF en la ruta ${propiedad.urlpdfentrega}: `, err);
                        }
                    }
    
                    return {
                        "Id_Entrega": propiedad.id_entrega,
                        "Informe": propiedad.informe,
                        "UrlPdfEntrega": pdfBase64, // Suponiendo que necesita el contenido base64 aquí
                        "Id_Tarea": propiedad.id_tarea,
                        "Disponible": propiedad.disponible,
                    };
                }));
            } else {
                return [];
            }
        } catch (err) {
            console.log(err);
            return 'Error de consulta';
        }
    }


}

module.exports = ServicioEntregas;