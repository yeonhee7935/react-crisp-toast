import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastProvider } from "./context/ToastContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ToastProvider maxToasts={3}>
      <App />
    </ToastProvider>
  </React.StrictMode>,
);
