import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
} from "react";
import ToastContainer from "../components/ToastContainer";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastPosition {
  vertical: "top" | "bottom";
  horizontal: "left" | "right" | "center";
}

export interface Toast {
  id: string; // Use UUID for unique IDs
  message: ReactNode;
  type: ToastType;
  duration?: number;
  position?: ToastPosition;
  showCloseButton?: boolean;
  soundEnabled?: boolean;
}

type ToastAction =
  | { type: "ADD_TOAST"; toast: Omit<Toast, "id"> }
  | { type: "REMOVE_TOAST"; id: string }
  | { type: "SET_QUEUE"; queue: Toast[] };

interface ToastState {
  toasts: Toast[];
  queue: Toast[];
  maxToasts: number;
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  soundEnabled?: boolean;
}

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  soundEnabled?: boolean;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Reducer to handle adding/removing toasts and managing the queue
const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      const newToast = { id: Date.now().toString(), ...action.toast };
      if (state.toasts.length < state.maxToasts) {
        return { ...state, toasts: [...state.toasts, newToast] };
      } else {
        return { ...state, queue: [...state.queue, newToast] };
      }
    case "REMOVE_TOAST":
      const remainingToasts = state.toasts.filter(
        (toast) => toast.id !== action.id,
      );
      if (remainingToasts.length < state.maxToasts && state.queue.length > 0) {
        const nextToast = state.queue[0];
        return {
          ...state,
          toasts: [...remainingToasts, nextToast],
          queue: state.queue.slice(1),
        };
      }
      return { ...state, toasts: remainingToasts };
    default:
      return state;
  }
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
  soundEnabled = false,
}) => {
  const initialState: ToastState = { toasts: [], queue: [], maxToasts };
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (toast: Omit<Toast, "id">) => {
    dispatch({ type: "ADD_TOAST", toast });
  };

  const removeToast = (id: string) => {
    dispatch({ type: "REMOVE_TOAST", id });
  };

  const groupedToasts = useMemo(() => {
    return state.toasts.reduce<Record<string, Toast[]>>((acc, toast) => {
      const { vertical, horizontal } = toast.position || {
        vertical: "top",
        horizontal: "right",
      };
      const positionKey = `${vertical}-${horizontal}`;
      acc[positionKey] = acc[positionKey] || [];
      acc[positionKey].push(toast);
      return acc;
    }, {});
  }, [state.toasts]); // Recalculates only when `toasts` changes

  return (
    <ToastContext.Provider value={{ addToast, removeToast, soundEnabled }}>
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
