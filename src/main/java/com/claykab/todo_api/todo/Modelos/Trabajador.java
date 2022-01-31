package com.claykab.todo_api.todo.Modelos;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.claykab.todo_api.todo.DTO.TrabajadorDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TRABAJADOR")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true, value = { "hibernateLazyInitializer", "handler", "fieldHandler" })
public class Trabajador {
    @Id
    @SequenceGenerator(name = "todo_seq", initialValue = 1110, allocationSize = 101)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "todo_seq")
    @Column(name = "id_trabajador", updatable = false, nullable = false)
    private Integer id;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "aPaterno")
    private String apellidoPaterno;
    @Column(name = "aMaterno")
    private String apellidoMaterno;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_puesto")
    private Puesto puesto;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_area")
    private Area area;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private Trabajador jefeInmediato;

    @OneToMany(mappedBy = "trabajador", cascade = CascadeType.ALL, orphanRemoval = true)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Asistencia> asistencias;

    public Trabajador() {
    }

    public Trabajador(String nombre, String apellidoPaterno, String apellidoMaterno) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
    }

    public Trabajador(TrabajadorDTO trabajador) {
        this.nombre = trabajador.getNombre();
        this.apellidoMaterno = trabajador.getApellidoMaterno();
        this.apellidoPaterno = trabajador.getApellidoPaterno();
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

    public Puesto getPuesto() {
        return puesto;
    }

    public void setPuesto(Puesto puesto) {
        this.puesto = puesto;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Trabajador getJefeInmediato() {
        return jefeInmediato;
    }

    public void setJefeInmediato(Trabajador jefeInmediato) {
        this.jefeInmediato = jefeInmediato;
    }

}
