package com.claykab.todo_api.todo.Modelos;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ASISTENCIA")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true, value = { "hibernateLazyInitializer", "handler", "fieldHandler" })
public class Asistencia {
    @Id
    @SequenceGenerator(name = "todo_seq", initialValue = 1110, allocationSize = 101)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "todo_seq")
    @Column(name = "id_asistencia", updatable = false, nullable = false)
    private Integer id;
    @Column(name = "hora_entrada")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    private Date horaEntrada;
    @Column(name = "hora_comida")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    private Date inicioComida;
    @Column(name = "hora_salida")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    private Date horaSalida;
    @ManyToOne
    @JoinColumn(name = "id_trabajador", nullable = false, updatable = false)
    private Trabajador trabajador;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getHoraEntrada() {
        return horaEntrada;
    }

    public void setHoraEntrada(Date horaEntrada) {
        this.horaEntrada = horaEntrada;
    }

    public Date getInicioComida() {
        return inicioComida;
    }

    public void setInicioComida(Date inicioComida) {
        this.inicioComida = inicioComida;
    }

    public Date getHoraSalida() {
        return horaSalida;
    }

    public void setHoraSalida(Date horaSalida) {
        this.horaSalida = horaSalida;
    }

    public Trabajador getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }

}
