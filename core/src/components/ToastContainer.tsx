import React from "react";
import Toast from "./Toast";
import { Toast as ToastType } from "../context/ToastContext";
import "../styles/toast.css";

interface ToastContainerProps {
  toasts: ToastType[];
  removeToast: (id: string) => void;
  position: string;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
  position,
}) => {
  return (
    <div className={`toast-container ${position}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
