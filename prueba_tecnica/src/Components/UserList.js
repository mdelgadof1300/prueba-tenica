import React, { useEffect, useState } from "react";
import "date-fns";
import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  Grid,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@material-ui/core";
import Modal from "react-modal";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import HistoryIcon from "@material-ui/icons/History";
import { Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { toast } from "react-toastify";
import {
  obtenerTrabajadores,
  obtenerAreas,
  obtenerPuestos,
} from "../API/catalogos";
import {
  eliminarTrabajador,
  actualizarTrabajador,
  obtenerAsistencias,
  agregarAsistenciaHoy,
} from "../API/trabajador";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: "#00796b",
    color: "white",
  },
  tableHeadCell: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const UserList = () => {
  const classes = useStyles();
  const [handleId, setHandleId] = useState();
  const [catalogos, setCatalogos] = useState(null);
  const [asistencias, setAsistencias] = useState([]);
  let [data, setData] = useState();

  const loadData = async () => {
    setData(null);
    let trabajadoresTemp = await obtenerTrabajadores();
    trabajadoresTemp = trabajadoresTemp.data;
    setData(trabajadoresTemp);
  };

  const loadAsistencias = async (id) => {
    let { data } = await obtenerAsistencias(id);
    setAsistencias(data);
  };

  const registroActualizado = () => {
    toast.success("1 registro actualizado con éxito", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAsistance = async () => {
    await agregarAsistenciaHoy(asistencia);
    loadAsistencias(asistencia.id);
    registroActualizado();
  };

  useEffect(() => {
    const loadData = async () => {
      setData(null);
      let trabajadoresTemp = await obtenerTrabajadores();
      trabajadoresTemp = trabajadoresTemp.data;
      setData(trabajadoresTemp);
    };
    loadData();
  }, []);

  const regresarTrabajador = (id) => {
    for (let trabajador of data) {
      if (trabajador.id === id) {
        return trabajador;
      }
    }
    return null;
  };

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

  const [editModal, setEditModal] = useState(false);
  const [asistenciaModal, setAsistenciaModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [asistencia, setAsistencia] = useState(null);

  const [state, setState] = useState({
    numeroEmpleado: "",
    nombre: "",
    apellidoMaterno: "",
    apellidoPaterno: "",
    puesto: "",
    area: "",
    jefeInmediato: "",
  });

  const handleUpdate = async (event) => {
    event.preventDefault();
    setEditModal(false);
    await actualizarTrabajador(state);
    registroActualizado();
    loadData();
    setState(null);
  };

  const esHoy = (fecha) => {
    const today = new Date();
    fecha = new Date(fecha);
    return (
      fecha.getDate() === today.getDate() &&
      fecha.getMonth() === today.getMonth() &&
      fecha.getFullYear() === today.getFullYear()
    );
  };

  const validarHoy = () => {
    for (let asistencia of asistencias) {
      if (
        esHoy(asistencia.horaEntrada) ||
        esHoy(asistencia.horaSalida) ||
        esHoy(asistencia.inicioComida)
      ) {
        return true;
      }
    }
    return false;
  };

  const handleDeleteHandler = async (e) => {
    e.preventDefault();
    await eliminarTrabajador(handleId);
    toast.error("1 registro eliminado exitosamente", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    loadData();
    setDeleteModal(false);
  };

  const editHandler = (e, id) => {
    e.preventDefault();
    setEditModal(true);
    setHandleId(id);
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    setHandleId(id);
    setDeleteModal(true);
  };

  const validar = (serach) => {
    return (
      serach.nombre.toLowerCase().includes(searchItem.toLowerCase()) ||
      serach.apellidoMaterno.toLowerCase().includes(searchItem.toLowerCase()) ||
      serach.apellidoPaterno.toLowerCase().includes(searchItem.toLowerCase())
    );
  };

  if (data === null) {
    return (
      <Box textAlign="center">
        <Typography variant="h5">Cargando</Typography>
        <CircularProgress />;
      </Box>
    );
  }

  return (
    <>
      <Box textAlign="center" p={1} className={classes.stuListColor}>
        <Typography variant="h5">Lista de empleados</Typography>
      </Box>

      <Box m={3} textAlign="center">
        <Link to="/">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ float: "left", marginTop: "8px" }}
          >
            Regresar a inicio
          </Button>
        </Link>

        <TextField
          autoComplete="name"
          name="searchItem"
          variant="outlined"
          id="name"
          label="Buscar ..."
          type="text"
          style={{ float: "right" }}
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </Box>

      <Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundcolor: "#00796b" }}>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Número de empleado
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Nombre(s)
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Apellido paterno
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Apellido materno
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Puesto
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Área
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Jefe inmediato
                </TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data && data.length > 0 ? (
                data
                  .filter((serach) => {
                    if (searchItem === "") {
                      return serach;
                    } else if (validar(serach)) {
                      return serach;
                    }
                    return false;
                  })
                  .map((item, index) => {
                    let jefeInmediato = regresarTrabajador(
                      item.jefeInmediato.id || item.jefeInmediato
                    );
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{item.id}</TableCell>
                        <TableCell align="center">{item.nombre}</TableCell>
                        <TableCell align="center">
                          {item.apellidoPaterno}
                        </TableCell>
                        <TableCell align="center">
                          {item.apellidoMaterno}
                        </TableCell>
                        <TableCell align="center">
                          {item.puesto.nombre}
                        </TableCell>
                        <TableCell align="center">{item.area.nombre}</TableCell>
                        <TableCell align="center">
                          {jefeInmediato === null
                            ? `No tiene un jefe asignado`
                            : ` ${jefeInmediato.nombre} ${jefeInmediato.apellidoPaterno} ${jefeInmediato.apellidoMaterno}`}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Editar">
                            <IconButton
                              onClick={(e) => {
                                editHandler(e, item.id);
                                setState({
                                  ...item,
                                  area: item.area.id,
                                  puesto: item.puesto.id,
                                });
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Borrar">
                            <IconButton
                              onClick={(e) => deleteHandler(e, item.id)}
                            >
                              <DeleteIcon color="secondary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Asistencia">
                            <IconButton
                              onClick={async () => {
                                await loadAsistencias(item.id);
                                let fecha = new Date();
                                setAsistencia({
                                  id: item.id,
                                  entrada: fecha,
                                  salida: fecha,
                                  comida: fecha,
                                });
                                setAsistenciaModal(true);
                              }}
                            >
                              <HistoryIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    No hay registros
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal
        isOpen={editModal}
        disableBackdropClick
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(0,0,0, 0.7)",
          },
          content: {
            textAlign: "center",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ccc",
            background: "#fff",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: "20px",
          },
        }}
        className="center"
      >
        <Box textAlign="center" className={classes.addStuColor} p={1} mb={2}>
          <Typography variant="h6">Editar información</Typography>
        </Box>
        {state !== null ? (
          <Paper>
            <form onSubmit={handleUpdate}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Numero de empleado: {state.id}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoComplete="nombre"
                    name="nombre"
                    variant="outlined"
                    id="nombre"
                    label="Nombre(s)"
                    value={state.nombre}
                    onChange={(e) =>
                      setState({
                        ...state,
                        nombre: e.target.value,
                      })
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
                    value={state.apellidoPaterno}
                    onChange={(e) =>
                      setState({
                        ...state,
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
                    value={state.apellidoMaterno}
                    onChange={(e) =>
                      setState({
                        ...state,
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
                      value={state.puesto}
                      label="Área"
                      onChange={(e) =>
                        setState({
                          ...state,
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
                      value={state.area}
                      label="Área"
                      onChange={(e) =>
                        setState({
                          ...state,
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
                      value={state.jefeInmediato}
                      label="Jefe inmediato"
                      onChange={(e) =>
                        setState({
                          ...state,
                          jefeInmediato: e.target.value,
                        })
                      }
                    >
                      {catalogos?.trabajadores?.map((elemento) => {
                        if (state.id !== elemento.id) {
                          return (
                            <MenuItem
                              key={elemento.id}
                              value={elemento.id}
                            >{`${elemento.nombre} ${elemento.apellidoPaterno} ${elemento.apellidoMaterno}`}</MenuItem>
                          );
                        }
                        return null;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box m={3} textAlign="center">
                <Button
                  type="submit"
                  variant="outlined"
                  style={{ color: "green" }}
                >
                  Actualizar
                </Button>
                <span></span>
                <Button
                  type="button"
                  variant="outlined"
                  style={{ margin: "20px" }}
                  onClick={() => setEditModal(false)}
                  color="primary"
                >
                  Cancelar
                </Button>
              </Box>
              <br></br>
            </form>
          </Paper>
        ) : (
          <></>
        )}
      </Modal>

      <Modal
        isOpen={asistenciaModal}
        disableBackdropClick
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(0,0,0, 0.7)",
          },
          content: {
            textAlign: "center",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ccc",
            background: "#fff",
            // overflow: 'scroll',
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: "20px",
          },
        }}
        className="center"
      >
        <Box textAlign="center" className={classes.addStuColor} p={1} mb={2}>
          <Typography variant="h6">Detalle asistencia</Typography>
        </Box>

        {asistencia && (
          <Paper>
            {!validarHoy() && (
              <Box m={3} textAlign="center">
                <form onSubmit={handleUpdate}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid justifyContent="space-around">
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Entrada"
                        value={asistencia.entrada}
                        onChange={(e) => {
                          setAsistencia({
                            ...asistencia,
                            entrada: e,
                          });
                        }}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </Grid>
                    <Grid justifyContent="space-around">
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Inicio de comida"
                        value={asistencia.comida}
                        onChange={(e) => {
                          setAsistencia({
                            ...asistencia,
                            comida: e,
                          });
                        }}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </Grid>
                    <Grid justifyContent="space-around">
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Salida"
                        value={asistencia.salida}
                        onChange={(e) => {
                          setAsistencia({
                            ...asistencia,
                            salida: e,
                          });
                        }}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Box m={3} textAlign="center">
                    <Button
                      type="submit"
                      variant="outlined"
                      style={{ color: "green" }}
                      onClick={handleAsistance}
                    >
                      Aceptar
                    </Button>
                  </Box>
                </form>
              </Box>
            )}
            <Paper>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundcolor: "#00796b" }}>
                      <TableCell
                        align="center"
                        className={classes.tableHeadCell}
                      >
                        Entrada
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.tableHeadCell}
                      >
                        Comida
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.tableHeadCell}
                      >
                        Salida
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {asistencias && asistencias.length > 0 ? (
                      asistencias.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell align="center">
                              {item.horaEntrada}
                            </TableCell>
                            <TableCell align="center">
                              {item.inicioComida}
                            </TableCell>
                            <TableCell align="center">
                              {item.horaSalida}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          component="th"
                          scope="row"
                          align="center"
                        >
                          No hay registros
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                type="button"
                variant="outlined"
                style={{ margin: "20px" }}
                onClick={() => setAsistenciaModal(false)}
                color="primary"
              >
                Cerrar
              </Button>
            </Paper>
          </Paper>
        )}
      </Modal>
      <Modal
        isOpen={deleteModal}
        disableBackdropClick
        style={{
          overlay: {
            position: "fixed",
            backgroundColor: "rgba(0,0,0, 0.7)",
          },
          content: {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "535px",
            height: "130px",
            border: "1px solid #ccc",
            background: "#fff",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: "20px",
          },
        }}
        className="center"
      >
        <Typography variant="h6">
          ¿Seguro quieres eliminar este registro?
        </Typography>
        <Box m={3} textAlign="center">
          <Button
            type="button"
            variant="outlined"
            onClick={(e) => handleDeleteHandler(e)}
            color="secondary"
          >
            Eliminar
          </Button>

          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => setDeleteModal(false)}
            style={{ margin: "20px" }}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default UserList;
