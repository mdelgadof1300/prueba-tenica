package com.claykab.todo_api.todo.Servicios;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import javax.transaction.Transactional;

import com.claykab.todo_api.todo.DTO.AsistenciasDTO;
import com.claykab.todo_api.todo.DTO.TrabajadorDTO;
import com.claykab.todo_api.todo.Modelos.Area;
import com.claykab.todo_api.todo.Modelos.Asistencia;
import com.claykab.todo_api.todo.Modelos.Puesto;
import com.claykab.todo_api.todo.Modelos.Trabajador;
import com.claykab.todo_api.todo.Repositorios.AreaRepository;
import com.claykab.todo_api.todo.Repositorios.AsistenciaRepository;
import com.claykab.todo_api.todo.Repositorios.PuestoRepository;
import com.claykab.todo_api.todo.Repositorios.TrabajadorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("Servicio")
public class AplicacionService {
    private static Logger logger = Logger.getLogger(AplicacionService.class.getName());

    @Autowired
    private TrabajadorRepository trabajadorRepository;

    @Autowired
    private PuestoRepository puestoRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    public List<Trabajador> obtenerTrabajadores() {
        logger.info("Regresando trabajadores");
        return (List<Trabajador>) trabajadorRepository.findAll();
    }

    public List<Area> obtenerAreas() {
        logger.info("Regresando areas");
        return (List<Area>) areaRepository.findAll();
    }

    public List<Asistencia> obtenerAsistenciasTrabajador(Integer id) {
        logger.info("Regresando areas");
        Optional<Trabajador> trabajador = trabajadorRepository.findById(id);
        if (trabajador.isPresent()) {
            return (List<Asistencia>) asistenciaRepository.obtenerAsistenciasTrabajador(trabajador.get());
        }
        return null;
    }

    public List<Puesto> obtenerPuestos() {
        logger.info("Regresando puestos");
        return (List<Puesto>) puestoRepository.findAll();
    }

    @Transactional(rollbackOn = Exception.class)
    public void agregarTrabajador(TrabajadorDTO trabajador) {
        Optional<Puesto> puesto = puestoRepository.findById(trabajador.getPuesto());
        Optional<Area> area = areaRepository.findById(trabajador.getArea());
        if (puesto.isPresent() && area.isPresent()) {
            Trabajador nuevo = new Trabajador(trabajador);
            nuevo.setPuesto(puesto.get());
            nuevo.setArea(area.get());
            if (trabajador.getJefeInmediato() != null) {
                Optional<Trabajador> jefeInmediato = trabajadorRepository.findById(trabajador.getJefeInmediato());
                nuevo.setJefeInmediato(jefeInmediato.get());
            } else {
                nuevo.setJefeInmediato(null);
            }
            nuevo = trabajadorRepository.save(nuevo);
            logger.info("Trabajador creado con id: " + nuevo.getId());
        }
    }

    @Transactional(rollbackOn = Exception.class)
    public void actualizarTrabajador(TrabajadorDTO trabajador) {
        Optional<Trabajador> trabajadorEnBase = trabajadorRepository.findById(trabajador.getId());
        if (trabajadorEnBase.isPresent()) {
            Trabajador nuevo = trabajadorEnBase.get();
            Optional<Puesto> puesto = puestoRepository.findById(trabajador.getPuesto());
            Optional<Area> area = areaRepository.findById(trabajador.getArea());
            if (puesto.isPresent() && area.isPresent()) {
                nuevo.setPuesto(puesto.get());
                nuevo.setArea(area.get());
                nuevo.setId(trabajador.getId());
                if (trabajador.getJefeInmediato() != null) {
                    Optional<Trabajador> jefeInmediato = trabajadorRepository.findById(trabajador.getJefeInmediato());
                    nuevo.setJefeInmediato(jefeInmediato.get());
                } else {
                    nuevo.setJefeInmediato(null);
                }
                nuevo = trabajadorRepository.save(nuevo);
                logger.info("Trabajador actualizado con id: " + nuevo.getId());
            }
        }
    }

    @Transactional(rollbackOn = Exception.class)
    public void eliminarTrabajador(Integer id) {
        Optional<Trabajador> trabajador = trabajadorRepository.findById(id);
        if (trabajador.isPresent()) {
            List<Trabajador> trabajadores = trabajadorRepository.obtenerTrabajadores(trabajador.get());
            for (Trabajador trabajadorTemp : trabajadores) {
                trabajadorTemp.setJefeInmediato(null);
            }
            trabajadorRepository.saveAll(trabajadores);
            trabajadorRepository.deleteById(id);
        }

    }

    @Transactional(rollbackOn = Exception.class)
    public void agregarAsistencia(AsistenciasDTO asistencias) {
        Optional<Trabajador> trabajador = trabajadorRepository.findById(asistencias.getId());
        if (trabajador.isPresent()) {
            Asistencia global = new Asistencia();
            global.setHoraEntrada(asistencias.getEntrada());
            global.setHoraSalida(asistencias.getSalida());
            global.setInicioComida(asistencias.getComida());
            global.setTrabajador(trabajador.get());
            asistenciaRepository.save(global);
        }
    }

}
