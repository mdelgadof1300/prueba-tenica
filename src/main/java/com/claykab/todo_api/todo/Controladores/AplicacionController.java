package com.claykab.todo_api.todo.Controladores;

import java.util.List;
import java.util.logging.Logger;

import com.claykab.todo_api.todo.DTO.AsistenciasDTO;
import com.claykab.todo_api.todo.DTO.TrabajadorDTO;
import com.claykab.todo_api.todo.Modelos.Area;
import com.claykab.todo_api.todo.Modelos.Asistencia;
import com.claykab.todo_api.todo.Modelos.Puesto;
import com.claykab.todo_api.todo.Modelos.Trabajador;
import com.claykab.todo_api.todo.Repositorios.AsistenciaRepository;
import com.claykab.todo_api.todo.Servicios.AplicacionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("Trabajadores")
@RequestMapping(AplicacionController.BASE_URL)
public class AplicacionController {
    public static final String BASE_URL = "api";

    private static final Logger logger = Logger.getLogger(AplicacionController.class.getName());

    @Autowired
    private AplicacionService aplicacionService;

    @RequestMapping(method = RequestMethod.GET, value = "/trabajadores")
    public List<Trabajador> obtenerTrabajadores() {
        logger.info("Obteniendo trabajadores");
        return aplicacionService.obtenerTrabajadores();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/puestos")
    public List<Puesto> obtenerPuestos() {
        logger.info("Obteniendo puestos");
        return aplicacionService.obtenerPuestos();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/areas")
    public List<Area> obtenerAreas() {
        logger.info("Obteniendo areas");
        return aplicacionService.obtenerAreas();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/crearTrabajador")
    public String crearTrabajador(@RequestBody TrabajadorDTO trabajador) {
        logger.info("Agregando trabajador: " + trabajador.toString());
        aplicacionService.agregarTrabajador(trabajador);
        return "OK";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/actualizarTrabajador")
    public String actualizarTrabajador(@RequestBody TrabajadorDTO trabajador) {
        logger.info("Actualizar trabajador: " + trabajador.toString());
        aplicacionService.actualizarTrabajador(trabajador);
        return "OK";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/eliminarTrabajador")
    public String crearTrabajador(@RequestBody Integer id) {
        logger.info("Eliminando trabajador: " + id);
        aplicacionService.eliminarTrabajador(id);
        return "OK";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/obtenerAsistencias")
    public List<Asistencia> obtenerAsistencias(@RequestParam("id") Integer id) {
        logger.info("ID trabajador: " + id);
        return aplicacionService.obtenerAsistenciasTrabajador(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/agregarAsistenciaHoy")
    public String agregarAsistencia(@RequestBody AsistenciasDTO asistencias) {
        logger.info("ID de trabajador: " + asistencias.getId());
        aplicacionService.agregarAsistencia(asistencias);
        return "OK";
    }

}
