import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { COLORS } from "../constants/colors";

const CommonModal = ({
  isOpen,
  onClose,
  onConfirm = null,
  confirmText = "Agregar",
  cancelText = "Cancelar",
  children,
  title,
}) => {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="border-0"
      contentClassName="rounded-4 shadow-sm p-4 bg-light"
      style={{
        backdropFilter: "blur(1.5px)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }} // BLURRR
    >
      <div
        className="position-absolute top-0 end-0 mt-3 me-3 fs-4 fw-bold text-dark"
        style={{ cursor: "pointer", zIndex: 1 }}
        onClick={onClose}
        aria-label="Cerrar"
      >
        ×
      </div>
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="text-center">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-4">{children}</Modal.Body>

      {onConfirm && (
        <div className="d-flex justify-content-center gap-3 pb-3">
          <button
            className="btnApp"
            style={{
              backgroundColor: COLORS.MAIN,
              border: "none",
              color: "#333",
            }}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button className="btnCancel" onClick={onClose}>
            {cancelText}
          </button>
        </div>
      )}
    </Modal>
  );
};

export default CommonModal;
