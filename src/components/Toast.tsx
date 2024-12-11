import React, { useEffect } from "react";
import { Toast as T } from "../context/ToastContext";
import "../styles/toast.css";

interface ToastProps extends T {
  onClose: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button className="toast-close" onClick={() => onClose(id)}>
        ✖
      </button>
    </div>
  );
};

export default Toast;
