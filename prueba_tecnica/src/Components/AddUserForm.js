import React, { useEffect, useState } from "react";
import {
  obtenerAreas,
  obtenerPuestos,
  obtenerTrabajadores,
  crearTrabajador,
} from "../API/catalogos";

import {
  Typography,
  Box,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  TextField,
  Paper,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: "#455a64",
    color: "white",
  },
  addStuColor: {
    backgroundColor: "#00796b",
    color: "white",
  },
});

const AddUserForm = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    nombre: "",
    apellidoMaterno: "",
    apellidoPaterno: "",
    puesto: "",
    area: "",
    jefeInmediato: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    if (
      user.nombre &&
      user.apellidoMaterno &&
      user.apellidoPaterno &&
      user.puesto &&
      user.area &&
      user.jefeInmediato !== 0
    ) {
      const body = {
        nombre: user.nombre,
        apellidoMaterno: user.apellidoMaterno,
        apellidoPaterno: user.apellidoPaterno,
        puesto: user.puesto,
        area: user.area,
        jefeInmediato: user.jefeInmediato,
      };

      await crearTrabajador(body);

      setUser({
        ...user,
        nombre: "",
        apellidoMaterno: "",
        apellidoPaterno: "",
        puesto: "",
        area: "",
        jefeInmediato: "",
      });

      toast.success("Registro exitoso", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Hay un error", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const [catalogos, setCatalogos] = useState(null);

  useEffect(() => {
    const fetchMyAPI = async () => {
      let areas = obtenerAreas();
      let puestos = obtenerPuestos();
      let trabajadores = obtenerTrabajadores();
      [areas, puestos, trabajadores] = await Promise.all([
        areas,
        puestos,
        trabajadores,
      ]);
      setCatalogos({
        areas: areas.data,
        puestos: puestos.data,
        trabajadores: trabajadores.data,
      });
    };

    fetchMyAPI();
  }, []);

  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={1} mb={2}>
        <Typography variant="h5">Prueba Técnica HabilMX</Typography>
      </Box>

      <Grid container justifyContent="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Paper>
            <Box
              textAlign="center"
              className={classes.addStuColor}
              p={1}
              mb={2}
            >
              <Typography variant="h6">Añadir empleado</Typography>
            </Box>

            <Box m={3} textAlign="center">
              <Link to="/list">
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  style={{ float: "right" }}
                >
                  Detalle de empleados
                </Button>
              </Link>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="nombre"
                    name="nombre"
                    variant="outlined"
                    id="nombre"
                    label="Nombre(s)"
                    value={user.nombre}
                    onChange={(e) =>
                      setUser({ ...user, nombre: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="apellidoPaterno"
                    name="apellidoPaterno"
                    variant="outlined"
                    id="apellidoPaterno"
                    label="Apellido Paterno"
                    value={user.apellidoPaterno}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        apellidoPaterno: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="apellidoMaterno"
                    name="apellidoMaterno"
                    variant="outlined"
                    id="apellidoMaterno"
                    label="Apellido Materno"
                    value={user.apellidoMaterno}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        apellidoMaterno: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Puesto
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={user.puesto}
                      label="Área"
                      onChange={(e) =>
                        setUser({
                          ...user,
                          puesto: e.target.value,
                        })
                      }
                    >
                      {catalogos?.puestos?.map((elemento) => {
                        return (
                          <MenuItem key={elemento.id} value={elemento.id}>
                            {elemento.nombre}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Área</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={user.area}
                      label="Área"
                      onChange={(e) =>
                        setUser({
                          ...user,
                          area: e.target.value,
                        })
                      }
                    >
                      {catalogos?.areas?.map((elemento) => {
                        return (
                          <MenuItem key={elemento.id} value={elemento.id}>
                            {elemento.nombre}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Jefe inmediato
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={user.jefeInmediato}
                      label="Jefe inmediato"
                      onChange={(e) =>
                        setUser({
                          ...user,
                          jefeInmediato: e.target.value,
                        })
                      }
                    >
                      {catalogos?.trabajadores?.map((elemento) => {
                        return (
                          <MenuItem
                            key={elemento.id}
                            value={elemento.id}
                          >{`${elemento.nombre} ${elemento.apellidoPaterno} ${elemento.apellidoMaterno}`}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <br></br>
              <Grid item xs={12}>
                <FormControl></FormControl>
              </Grid>

              <Box m={3} textAlign="center">
                <Button type="submit" variant="outlined" color="primary">
                  Registrar
                </Button>
              </Box>

              <br></br>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AddUserForm;
