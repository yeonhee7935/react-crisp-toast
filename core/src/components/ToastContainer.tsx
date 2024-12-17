import React from "react";
import Toast from "@src/components/Toast";
import { Toast as ToastType } from "@src/context/ToastContext";
import "@src/styles/toast.css";
import "@testing-library/jest-dom";

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
