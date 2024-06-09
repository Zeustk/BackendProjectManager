const fs = require('fs');
class ServicioTareas {

    constructor(DB) {
        this.DB = DB;
    }




    async addTarea(Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Porcentajetarea, Id_Proyecto, Id_usuario, urlPdf,Id_Estado) {
        try {

            const Disponible = "SI";



            const sql = "INSERT INTO TAREAS(Id_Tarea, Nombre, Fecha_Inicio, Fecha_Finalizacion,Descripcion,PorcentajeTarea,Id_Proyecto,Id_Usuario,Disponible,urlPdf,Id_Estado) VALUES (NEXTVAL('secuenciatareas'), ?,?, ?, ?, ?,?,?,?,?,?)";

            console.log('hola');


            await this.DB.Open(sql, [Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Porcentajetarea, Id_Proyecto, Id_usuario, Disponible, urlPdf,Id_Estado]);

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
                        "urlPdf": pdfBase64, // Enviar el PDF en formato base64
                        "Id_Estado":propiedad.id_estado,
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
        console.log(Id_Tarea);
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

    async UpdateEstadoTareas(Id_Tarea, Id_Estado) {

        try {


            const sql = "update Tareas set Id_Estado=? where Id_Tarea=?";

            await this.DB.Open(sql, [Id_Estado,Id_Tarea]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


}

module.exports = ServicioTareas;