import { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const messageByVariant = {
  danger: "Error",
  success: "Éxito",
};
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "danger",
  });

  const showToast = useCallback((message, variant = "danger") => {
    setToast({ show: true, message, variant });
  }, []);

  const hideToast = () => setToast((prev) => ({ ...prev, show: false }));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 9999,
        }}
      >
        <Toast
          bg={toast.variant}
          show={toast.show}
          onClose={hideToast}
          delay={8000}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto text-capitalize">
              {messageByVariant[toast.variant]}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
