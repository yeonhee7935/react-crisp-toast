import React from "react";
import Toast from "./Toast";
import { Toast as ToastType } from "../context/ToastContext";
import "../styles/toast.css";

interface ToastContainerProps {
  toasts: ToastType[];
  removeToast: (id: number) => void;
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
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
