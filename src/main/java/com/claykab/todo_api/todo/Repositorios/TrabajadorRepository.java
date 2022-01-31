package com.claykab.todo_api.todo.Repositorios;

import java.sql.Date;
import java.util.List;

import com.claykab.todo_api.todo.Modelos.Asistencia;
import com.claykab.todo_api.todo.Modelos.Trabajador;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TrabajadorRepository extends CrudRepository<Trabajador, Integer> {
    @Query("select a from Asistencia a where a.horaEntrada>=:dia and a.horaEntrada<:dia+1 and a.trabajador=:trabajador")
    public Asistencia obtenerAsistenciaDia(@Param("dia") Date dia, @Param("trabajador") Trabajador trabajador);

    @Query("select t from Trabajador t where t.jefeInmediato=:trabajador")
    public List<Trabajador> obtenerTrabajadores(@Param("trabajador") Trabajador trabajador);
}