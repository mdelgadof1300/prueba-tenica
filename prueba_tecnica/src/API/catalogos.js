import cliente from "./default";

const crearTrabajador = (trabajador) => {
  return cliente.post("/crearTrabajador", trabajador);
};

const obtenerTrabajadores = () => {
  return cliente.get("/trabajadores");
};

const obtenerPuestos = () => {
  return cliente.get("/puestos");
};
const obtenerAreas = () => {
  return cliente.get("/areas");
};

export { crearTrabajador, obtenerTrabajadores, obtenerPuestos, obtenerAreas };
