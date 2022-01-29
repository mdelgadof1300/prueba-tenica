import React, { useEffect, useState } from "react";
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
} from "@material-ui/core";
import Modal from "react-modal";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../redux/action/Action";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { spacing } from "@material-ui/system";

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
  const dispatch = useDispatch();
  const [handleId, setHandleId] = useState();

  let [data, setData] = useState();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const [state, setState] = useState({
    numeroEmpleado: "",
    nombre: "",
    apellidoMaterno: "",
    apellidoPaterno: "",
    puesto: "",
    area: "",
    jefeInmediato: "",
  });

  data = JSON.parse(localStorage.getItem("userdata"));
  // data is coming from local storage in data

  // for search item from list

  const reduxData = useSelector((state) => state.userDetails.userDetail);
  const updateId = useSelector((state) => state.userDetails.handleId);

  useEffect(() => {
    if (reduxData !== undefined) {
      setState({
        numeroEmpleado: reduxData.numeroEmpleado,
        nombre: reduxData.nombre,
        apellidoMaterno: reduxData.apellidoMaterno,
        apellidoPaterno: reduxData.apellidoPaterno,
        puesto: reduxData.puesto,
        area: reduxData.area,
        jefeInmediato: reduxData.jefeInmediato,
      });
    }
  }, [reduxData]);

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log("update data from handleUpdate", handleId);
    setEditModal(false);
    setState({
      numeroEmpleado: state.numeroEmpleado,
      nombre: state.nombre,
      apellidoMaterno: state.apellidoMaterno,
      apellidoPaterno: state.apellidoPaterno,
      puesto: state.puesto,
      area: state.area,
      jefeInmediato: state.jefeInmediato,
    });
    console.log("this is updated data", state);
    const updatedData = JSON.parse(localStorage.getItem("userdata"));
    console.log("909090", updatedData);
    updatedData[handleId] = state; //updating detail on perticular index
    console.log("i am updating array", updatedData);
    localStorage.setItem("userdata", JSON.stringify(updatedData));
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

  const handleDeleteHandler = (e) => {
    e.preventDefault();
    let deleteData = JSON.parse(localStorage.getItem("userdata"));
    console.log("delete item", deleteData);
    if (deleteData.length === 1) {
      console.log("last data in the table");
      localStorage.removeItem("userdata");
      setHandleId("");
      setDeleteModal(false);
    } else {
      deleteData.splice(handleId, 1);
      localStorage.setItem("userdata", JSON.stringify(deleteData));
      setHandleId("");
      setDeleteModal(false);
    }
    toast.error("1 registro eliminado exitosamente", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const editHandler = (e, id) => {
    e.preventDefault();
    console.log("i am edit", id);
    setEditModal(true);
    dispatch(editUser(id));
    setHandleId(id);
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    setHandleId(id);
    console.log("delete handler Id", id);
    setDeleteModal(true);
  };

  return (
    <>
      {console.log("this is search", searchItem)}
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

        {/* { 
                  data.map((data)=>{
                    return <h5>{data.name}</h5>
               })
              }    */}
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
                    } else if (
                      serach.name
                        .toLowerCase()
                        .includes(searchItem.toLowerCase())
                    ) {
                      return serach;
                    }
                  })
                  .map((item, index) => {
                    let id = index;
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {item.numeroEmpleado}
                        </TableCell>
                        <TableCell align="center">{item.nombre}</TableCell>
                        <TableCell align="center">
                          {item.apellidoPaterno}
                        </TableCell>
                        <TableCell align="center">
                          {item.apellidoMaterno}
                        </TableCell>
                        <TableCell align="center">{item.puesto}</TableCell>
                        <TableCell align="center">{item.area}</TableCell>
                        <TableCell align="center">
                          {item.jefeInmediato}
                        </TableCell>

                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton onClick={(e) => editHandler(e, id)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={(e) => deleteHandler(e, id)}>
                              <DeleteIcon color="secondary" />
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
            width: "300px",
            height: "422px",
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
          <Typography variant="h6">Editar información</Typography>
        </Box>
        <Paper>
          <form onSubmit={handleUpdate}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="nuevoEmpleado"
                  name="numeroEmpleado"
                  variant="outlined"
                  id="numeroEmpleado"
                  label="Número de empleado"
                  type="text"
                  value={state.numeroEmpleado}
                  onChange={(e) =>
                    setState({
                      ...state,
                      numeroEmpleado: e.target.value,
                    })
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
                <TextField
                  autoComplete="Puesto"
                  name="Puesto"
                  variant="outlined"
                  id="Puesto"
                  label="Puesto"
                  value={state.puesto}
                  onChange={(e) =>
                    setState({
                      ...state,
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
                  label="Area"
                  value={state.area}
                  onChange={(e) =>
                    setState({
                      ...state,
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
                  value={state.jefeInmediato}
                  onChange={(e) =>
                    setState({
                      ...state,
                      jefeInmediato: e.target.value,
                    })
                  }
                />
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
            // overflow: 'scroll',
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
            color="primary"
            style={{ margin: "20px" }}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default UserList;
