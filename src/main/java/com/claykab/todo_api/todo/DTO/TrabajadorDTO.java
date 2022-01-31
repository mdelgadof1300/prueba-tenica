package com.claykab.todo_api.todo.DTO;

public class TrabajadorDTO {
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private Integer puesto;
    private Integer area;
    private Integer jefeInmediato;
    private Integer id;

    public TrabajadorDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public Integer getPuesto() {
        return puesto;
    }

    public void setPuesto(Integer puesto) {
        this.puesto = puesto;
    }

    public Integer getArea() {
        return area;
    }

    public void setArea(Integer area) {
        this.area = area;
    }

    public Integer getJefeInmediato() {
        return jefeInmediato;
    }

    public void setJefeInmediato(Integer jefeInmediato) {
        this.jefeInmediato = jefeInmediato;
    }

    @Override
    public String toString() {
        return "TrabajadorDTO [apellidoMaterno=" + apellidoMaterno + ", apellidoPaterno=" + apellidoPaterno + ", area="
                + area + ", jefeInmediato=" + jefeInmediato + ", nombre=" + nombre + ", puesto=" + puesto + "]";
    }

}
