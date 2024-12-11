import React, { createContext, useContext, useState } from "react";
import ToastContainer from "../components/ToastContainer";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastPosition {
  vertical: "top" | "bottom";
  horizontal: "left" | "right" | "center";
}

export interface Toast {
  id: string; // Use UUID for unique IDs
  message: string;
  type: ToastType;
  duration?: number;
  position?: ToastPosition;
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
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
    const newToast = { id: crypto.randomUUID(), ...toast }; // Generate UUID
    if (toasts.length < maxToasts) {
      setToasts((prev) => [...prev, newToast]);
    } else {
      setQueue((prev) => [...prev, newToast]);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => {
      const remainingToasts = prev.filter((toast) => toast.id !== id);
      if (remainingToasts.length < maxToasts && queue.length > 0) {
        const nextToast = queue[0];
        setQueue((prevQueue) => prevQueue.slice(1));
        setToasts((prevToasts) => [...remainingToasts, nextToast]);
      }
      return remainingToasts;
    });
  };

  // Group toasts by position
  const groupedToasts = toasts.reduce<Record<string, Toast[]>>((acc, toast) => {
    const { vertical, horizontal } = toast.position || {
      vertical: "top",
      horizontal: "right",
    };
    const positionKey = `${vertical}-${horizontal}`;
    acc[positionKey] = acc[positionKey] || [];
    acc[positionKey].push(toast);
    return acc;
  }, {});

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {Object.entries(groupedToasts).map(([positionKey, toasts]) => (
        <ToastContainer
          key={positionKey}
          position={positionKey}
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
