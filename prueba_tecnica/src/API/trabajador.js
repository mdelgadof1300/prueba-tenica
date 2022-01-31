import cliente from "./default";

const crearTrabajador = (trabajador) => {
  return cliente.post("/crearTrabajador", trabajador);
};

const eliminarTrabajador = (id) => {
  return cliente.post("/eliminarTrabajador", id);
};

const actualizarTrabajador = (id) => {
  return cliente.post("/actualizarTrabajador", id);
};

const obtenerAsistencias = (id) => {
  return cliente.get("/obtenerAsistencias", {
    params: {
      id: id,
    },
  });
};

const agregarAsistenciaHoy = (id) => {
  return cliente.post("/agregarAsistenciaHoy", id);
};

export {
  crearTrabajador,
  eliminarTrabajador,
  actualizarTrabajador,
  obtenerAsistencias,
  agregarAsistenciaHoy,
};
