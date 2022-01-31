import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

const EditModal = ({
  editModal,
  classesModal,
  stateModal,
  setStateModal,
  handleUpdateModal,
  catalogosModal,
  setEditModal,
}) => {
  return (
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
          // overflow: 'scroll',
          WebkitOverflowScrolling: "touch",
          borderRadius: "10px",
          outline: "none",
          padding: "20px",
        },
      }}
      className="center"
    >
      <Box textAlign="center" className={classesModal.addStuColor} p={1} mb={2}>
        <Typography variant="h6">Editar información</Typography>
      </Box>
      {stateModal !== null ? (
        <Paper>
          <form onSubmit={handleUpdateModal}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                Numero de empleado: {stateModal.id}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="nombre"
                  name="nombre"
                  variant="outlined"
                  id="nombre"
                  label="Nombre(s)"
                  value={stateModal.nombre}
                  onChange={(e) =>
                    setStateModal({
                      ...stateModal,
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
                  value={stateModal.apellidoPaterno}
                  onChange={(e) =>
                    setStateModal({
                      ...stateModal,
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
                  value={stateModal.apellidoMaterno}
                  onChange={(e) =>
                    setStateModal({
                      ...stateModal,
                      apellidoMaterno: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Puesto</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={stateModal.puesto}
                    label="Área"
                    onChange={(e) =>
                      setStateModal({
                        ...stateModal,
                        puesto: e.target.value,
                      })
                    }
                  >
                    {catalogosModal?.puestos?.map((elemento) => {
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
                    value={stateModal.area}
                    label="Área"
                    onChange={(e) =>
                      setStateModal({
                        ...stateModal,
                        area: e.target.value,
                      })
                    }
                  >
                    {catalogosModal?.areas?.map((elemento) => {
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
                    value={stateModal.jefeInmediato}
                    label="Jefe inmediato"
                    onChange={(e) =>
                      setStateModal({
                        ...stateModal,
                        jefeInmediato: e.target.value,
                      })
                    }
                  >
                    {catalogosModal?.trabajadores?.map((elemento) => {
                      if (stateModal.id !== elemento.id) {
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
  );
};

export default EditModal;
