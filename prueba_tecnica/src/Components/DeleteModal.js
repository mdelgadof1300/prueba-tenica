import { Box, Button, Modal, Typography } from "@material-ui/core";

const DeleteModal = ({ deleteModal, handleDeleteHandler, setDeleteModal }) => {
  return (
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
  );
};

export default DeleteModal;
