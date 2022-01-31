package com.claykab.todo_api.todo.Repositorios;

import java.util.List;

import com.claykab.todo_api.todo.Modelos.Asistencia;
import com.claykab.todo_api.todo.Modelos.Trabajador;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface AsistenciaRepository extends CrudRepository<Asistencia, Integer> {

    @Query("Select a from Asistencia a where a.trabajador=:trabajador")
    public List<Asistencia> obtenerAsistenciasTrabajador(@Param("trabajador") Trabajador Trabajador);
}
