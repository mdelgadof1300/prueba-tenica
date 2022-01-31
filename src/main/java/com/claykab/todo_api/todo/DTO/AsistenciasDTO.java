package com.claykab.todo_api.todo.DTO;

import java.util.Date;

public class AsistenciasDTO {
    private Date entrada;
    private Date salida;
    private Date comida;
    private Integer id;

    public AsistenciasDTO() {
    }

    public Date getEntrada() {
        return entrada;
    }

    public void setEntrada(Date entrada) {
        this.entrada = entrada;
    }

    public Date getSalida() {
        return salida;
    }

    public void setSalida(Date salida) {
        this.salida = salida;
    }

    public Date getComida() {
        return comida;
    }

    public void setComida(Date comida) {
        this.comida = comida;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}
