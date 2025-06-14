import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CommonModal = ({
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Agregar",
  cancelText = "Cancelar",
  children,
}) => {
  console.log(isOpen, onClose, children);
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
      dialogClassName="border-0"
      contentClassName="rounded-4 shadow-sm p-4 bg-light"
    >
      <div
        className="position-absolute top-0 end-0 mt-3 me-3 fs-4 fw-bold text-dark"
        style={{ cursor: "pointer", zIndex: 1 }}
        onClick={onClose}
        aria-label="Cerrar"
      >
        ×
      </div>

      <Modal.Body className="pt-4">{children}</Modal.Body>

      <div className="d-flex justify-content-center gap-3 pb-3">
        <button
          className="btn btn-success px-4 rounded-pill"
          style={{ backgroundColor: "#b8cc9c", border: "none", color: "#333" }}
          onClick={onConfirm}
        >
          {confirmText}
        </button>
        <button
          className="btn btn-outline-secondary px-4 rounded-pill bg-white text-dark"
          onClick={onClose}
        >
          {cancelText}
        </button>
      </div>
    </Modal>
  );
};

export default CommonModal;
