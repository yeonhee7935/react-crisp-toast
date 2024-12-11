import React, { createContext, useContext, useState } from "react";
import ToastContainer from "../components/ToastContainer";

type ToastType = "success" | "error" | "warning" | "info";
type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
  position?: ToastPosition;
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: number) => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts: number;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [queue, setQueue] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    if (toasts.length < maxToasts) {
      setToasts((prev) => [...prev, { id: Date.now(), ...toast }]);
    } else {
      setQueue((prev) => [...prev, { id: Date.now(), ...toast }]);
    }
  };

  const removeToast = (id: number) => {
    setToasts((prev) => {
      const remainingToasts = prev.filter((toast) => toast.id !== id);
      if (remainingToasts.length < maxToasts && queue.length > 0) {
        const nextToast = queue[0];
        setQueue((prevQueue) => prevQueue.slice(1));
        remainingToasts.push(nextToast);
      }
      return remainingToasts;
    });
  };

  const groupedToasts = toasts.reduce<Record<ToastPosition, Toast[]>>(
    (acc, toast) => {
      const position = toast.position || "top-right";
      acc[position] = acc[position] || [];
      acc[position].push(toast);
      return acc;
    },
    {
      "top-left": [],
      "top-right": [],
      "bottom-left": [],
      "bottom-right": [],
      "top-center": [],
      "bottom-center": [],
    },
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {Object.entries(groupedToasts).map(([position, toasts]) => (
        <ToastContainer
          key={position}
          position={position as ToastPosition}
          toasts={toasts}
          removeToast={removeToast}
        />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
