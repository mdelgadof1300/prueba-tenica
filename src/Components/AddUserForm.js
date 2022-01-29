import React, { useState } from "react";
import {
  Typography,
  Box,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Grid,
  Button,
  TextField,
  Paper,
  Modal,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const nameRegx = new RegExp("/^[a-zA-Z].*$");
const emailRegx = new RegExp("/^[a-zA-Z0-9].*@[a-zA-Z].*[.][a-zA-Z]$");
const phoneRegx = new RegExp("/^91[0-9]{10}$");

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

  const [isError, setIsError] = useState({
    formError: { name: "", phone: "", email: "" },
    phoneError: "",
    emailError: "",
  });

  const [user, setUser] = useState({
    numeroEmpleado: "",
    nombre: "",
    apellidoMaterno: "",
    apellidoPaterno: "",
    puesto: "",
    area: "",
    jefeInmediato: "",
  });

  const validator = (fields, value) => {
    let fieldValidate = isError.formError;
    let nameValidate = isError.nameError;
    let emailValidate = isError.emailError;
    let phoneValidate = isError.phoneError;

    switch (fields) {
      case "name":
        nameValidate = value.match(/^[A-Za-z]+$/);
        fieldValidate.name = nameValidate ? "" : "name is not valid";
        break;
      case "email":
        emailValidate = value.match();
        fieldValidate.email = emailValidate ? "" : "Phone is not valid";
        break;
      case "phone":
        phoneValidate = value.match(/^[0-9]{10}$/);
        fieldValidate.phone = phoneValidate ? "" : "phone is not valid";
        break;
      default:
        break;
    }

    setIsError({
      formError: fieldValidate,
      emailError: emailValidate,
      phoneEmail: emailValidate,
    });
  };

  const selectionHandler = (e) => {
    console.log("multiple selection", e);
    setUser({ ...user, userType: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.numeroEmpleado &&
      user.nombre &&
      user.apellidoMaterno &&
      user.apellidoPaterno &&
      user.puesto &&
      user.area &&
      user.jefeInmediato !== 0
    ) {
      const body = {
        numeroEmpleado: user.numeroEmpleado,
        nombre: user.nombre,
        apellidoMaterno: user.apellidoMaterno,
        apellidoPaterno: user.apellidoPaterno,
        puesto: user.puesto,
        area: user.area,
        jefeInmediato: user.jefeInmediato,
      };
      var localdata = JSON.parse(localStorage.getItem("userdata"));
      localdata = localdata ? localdata : [];
      localdata.push(body);
      localStorage.setItem("userdata", JSON.stringify(localdata));

      setUser({
        ...user,
        numeroEmpleado: "",
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

  console.log("local storage data", user);

  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={1} mb={2}>
        <Typography variant="h5">Prueba Técnica HabilMX</Typography>
      </Box>

      <Grid container justify="center" spacing={4}>
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
                    autoComplete="numeroEmpleado"
                    name="numeroEmpleado"
                    variant="outlined"
                    id="numeroEmpleado"
                    label="Número empleado"
                    value={user.name}
                    onChange={(e) =>
                      setUser({ ...user, numeroEmpleado: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="nombre"
                    name="nombre"
                    variant="outlined"
                    id="nombre"
                    label="Nombre(s)"
                    value={user.name}
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
                  <TextField
                    autoComplete="Puesto"
                    name="Puesto"
                    variant="outlined"
                    id="Puesto"
                    label="Puesto"
                    value={user.puesto}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        puesto: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="Area"
                    name="Area"
                    variant="outlined"
                    id="Area"
                    label="Área"
                    value={user.area}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        area: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="jefeInmediato"
                    name="jefeInmediato"
                    variant="outlined"
                    id="jefeInmediato"
                    label="Jefe Inmediato"
                    value={user.jefeInmediato}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        jefeInmediato: e.target.value,
                      })
                    }
                  />
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
      <ToastContainer />
    </>
  );
};

export default AddUserForm;
