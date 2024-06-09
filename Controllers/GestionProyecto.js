class ServicioProyectos {

    constructor(DB) {
        this.DB = DB;
    }


    async addProyecto(Lider_Proyecto, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Id_Estado, PorcentajeProyecto) {
        try {

            const Disponible = "SI";


            const sql = "INSERT INTO Proyectos(Id_Proyecto, Lider_Proyecto, Nombre, Fecha_Inicio, Fecha_Finalizacion,Descripcion,Disponible,Id_Estado,PorcentajeProyecto) VALUES (NEXTVAL('secuenciaproyectos'), ?,?, ?, ?, ?,?,?,?)";

            await this.DB.Open(sql, [Lider_Proyecto, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Disponible, Id_Estado, PorcentajeProyecto]);

            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }


    async getProyecto(id_usuario) {

        try {

            const sql = "SELECT DISTINCT p.* FROM proyectos p LEFT JOIN detalleproyectousuarios t ON p.id_proyecto = t.id_proyecto where t.id_usuario = ? AND p.Disponible= 'SI' ";

            let result = await this.DB.Open(sql, [id_usuario]);

            if (result && result.length > 0) {

                return result.map(propiedad => ({
                    "Id_Proyecto": propiedad.id_proyecto,
                    "Lider_Proyecto": propiedad.lider_proyecto,
                    "Nombre": propiedad.nombre,
                    "Fecha_Inicio": propiedad.fecha_inicio,
                    "Fecha_Finalizacion": propiedad.fecha_finalizacion,
                    "Descripcion": propiedad.descripcion,
                    "Id_Estado": propiedad.id_estado,
                    "PorcentajeProyecto": propiedad.porcentajeproyecto,
                }));
            } else {
                // No se encontraron proyectos


                return [];
            }
        } catch (err) {
            // Manejar errores
            console.log('error en proyecto get');
            console.error(err);
            return 'Error de consulta';
        }
    }



    async UpdateProyecto(Id_Proyecto, Lider_Proyecto, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion) {

        try {


            const sql = "update Proyectos set Lider_Proyecto=?,Nombre=?,Fecha_Inicio=?,Fecha_Finalizacion=?,Descripcion=? where Id_Proyecto=?";

            await this.DB.Open(sql, [Lider_Proyecto, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Id_Proyecto]);

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

    async getProyectoPorLider(id_LiderProyecto) {

        try {

            const sql = "SELECT DISTINCT p.* FROM proyectos p LEFT JOIN detalleproyectousuarios t ON p.id_proyecto = t.id_proyecto where t.id_liderproyecto = ? AND p.Disponible= 'SI' ";

            let result = await this.DB.Open(sql, [id_LiderProyecto]);

            if (result && result.length > 0) {

                return result.map(propiedad => ({
                    "Id_Proyecto": propiedad.id_proyecto,
                    "Lider_Proyecto": propiedad.lider_proyecto,
                    "Nombre": propiedad.nombre,
                    "Fecha_Inicio": propiedad.fecha_inicio,
                    "Fecha_Finalizacion": propiedad.fecha_finalizacion,
                    "Descripcion": propiedad.descripcion,
                    "Id_Estado": propiedad.id_estado,
                    "PorcentajeProyecto": propiedad.porcentajeproyecto,
                }));
            } else {
                // No se encontraron proyectos


                return [];
            }
        } catch (err) {
            // Manejar errores
            console.log('error en proyecto get');
            console.error(err);
            return 'Error de consulta';
        }
    }

    async getInformebyId(Id_Proyecto) {
        try {

            const sql = `SELECT
                            COUNT(*) FILTER (WHERE T.Id_Estado = 3) AS Tareas_Completadas,
                            COUNT(*) FILTER (WHERE T.Id_Estado = 2) AS Tareas_En_Curso,
                            COUNT(*) FILTER (WHERE T.Id_Estado = 1) AS Tareas_Pendientes,
                            COUNT(*) AS Total_Tareas
                        FROM
                            Tareas T
                        WHERE
                            T.Id_Proyecto = ? AND DISPONIBLE = 'SI'`;

            let result = await this.DB.Open(sql, [Id_Proyecto]);


            if (result && result.length > 0) {
                // Aquí iteramos sobre el arreglo result directamente
                return result.map(propiedad => ({
                    "Tareas_Completadas": propiedad.tareas_completadas,
                    "Tareas_En_Curso": propiedad.tareas_en_curso,
                    "Tareas_Pendientes": propiedad.tareas_pendientes,
                    "Total_Tareas": propiedad.total_tareas,
                }));
            } else {
                return {}; // No se encontraron registros
            }
        } catch (err) {
            console.error(err);
            return 'Error de consulta';
        }
    }

    async getInformeGeneralbyLider(id_LiderProyecto) {
        try {

            const sql = `SELECT
                        P.nombre,
                        COUNT(DISTINCT T.id_tarea) FILTER (WHERE T.Id_Estado = 3 AND T.Disponible = 'SI') AS Tareas_Completadas,
                        COUNT(DISTINCT T.id_tarea) FILTER (WHERE T.Id_Estado = 2 AND T.Disponible = 'SI') AS Tareas_En_Curso,
                        COUNT(DISTINCT T.id_tarea) FILTER (WHERE T.Id_Estado = 1 AND T.Disponible = 'SI') AS Tareas_Pendientes,
                        COUNT(DISTINCT T.id_tarea) FILTER (WHERE T.Disponible = 'SI') AS Total_Tareas,
                        P.porcentajeProyecto
                    FROM
                        Proyectos P
                    LEFT JOIN detalleproyectousuarios DPU ON P.id_proyecto = DPU.id_proyecto
                    LEFT JOIN Tareas T ON P.id_proyecto = T.id_proyecto
                    WHERE
                        DPU.id_liderproyecto = ? AND P.Disponible = 'SI'
                    GROUP BY
                        P.id_proyecto`;

            let result = await this.DB.Open(sql, [id_LiderProyecto]);


            if (result && result.length > 0) {
                // Aquí iteramos sobre el arreglo result directamente
                return result.map(propiedad => ({
                    "Nombre_Proyecto":propiedad.nombre,
                    "Tareas_Completadas": propiedad.tareas_completadas,
                    "Tareas_En_Curso": propiedad.tareas_en_curso,
                    "Tareas_Pendientes": propiedad.tareas_pendientes,
                    "Total_Tareas": propiedad.total_tareas,
                    "Porcentaje_Proyecto":propiedad.porcentajeproyecto,
                }));
            } else {
                return {}; // No se encontraron registros
            }
        } catch (err) {
            console.error(err);
            return 'Error de consulta';
        }
    }





}

module.exports = ServicioProyectos;