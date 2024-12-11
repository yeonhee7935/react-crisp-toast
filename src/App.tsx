import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ToastProvider, useToast } from "./context/ToastContext";

const App = () => {
  const { addToast } = useToast();

  // State for user input
  const [position, setPosition] = useState<
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center"
  >("top-right");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "info",
  );
  const [duration, setDuration] = useState<number>(3000);
  const [message, setMessage] = useState<string>("This is a toast!");

  const handleShowToast = () => {
    addToast({ message, type, position, duration });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Toast Notification Example</h1>

      {/* Toast Message Input */}
      <label>
        <strong>Toast Message:</strong>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </label>

      <br />
      <br />

      {/* Position Selector (Radio Buttons) */}
      <fieldset style={{ marginBottom: "20px" }}>
        <legend>
          <strong>Select Position:</strong>
        </legend>
        {[
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
          "top-center",
          "bottom-center",
        ].map((pos) => (
          <label key={pos} style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="radio"
              name="position"
              value={pos}
              checked={position === pos}
              onChange={(e) => setPosition(e.target.value as any)}
            />
            {pos}
          </label>
        ))}
      </fieldset>

      {/* Type Selector (Radio Buttons) */}
      <fieldset style={{ marginBottom: "20px" }}>
        <legend>
          <strong>Select Type:</strong>
        </legend>
        {["success", "error", "warning", "info"].map((toastType) => (
          <label
            key={toastType}
            style={{ display: "block", marginBottom: "5px" }}
          >
            <input
              type="radio"
              name="type"
              value={toastType}
              checked={type === toastType}
              onChange={(e) => setType(e.target.value as any)}
            />
            {toastType}
          </label>
        ))}
      </fieldset>

      {/* Duration Input */}
      <label>
        <strong>Duration (ms):</strong>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </label>

      <br />
      <br />

      {/* Show Toast Button */}
      <button
        onClick={handleShowToast}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Show Toast
      </button>
    </div>
  );
};

ReactDOM.render(
  <ToastProvider maxToasts={3}>
    <App />
  </ToastProvider>,
  document.getElementById("root"),
);

export default App;
