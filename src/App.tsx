import React, { useState } from "react";
import { ToastProvider, useToast } from "./context/ToastContext";

const ExamplePage: React.FC = () => {
  const { addToast } = useToast();

  const [showCloseButton, setShowCloseButton] = useState(false);
  const [message, setMessage] = useState("Hello, this is a toast!");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "info",
  );
  const [duration, setDuration] = useState(3000);
  const [vertical, setVertical] = useState<"top" | "bottom">("top");
  const [horizontal, setHorizontal] = useState<"left" | "right" | "center">(
    "right",
  );
  const [soundEnabled, setSoundEnabled] = useState(false); // New state for sound

  const showToast = () => {
    addToast({
      message,
      type,
      duration,
      position: { vertical, horizontal },
      showCloseButton,
      soundEnabled, // Passing the soundEnabled state
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Toast Example</h1>
      <div style={{ marginBottom: "36px" }}>
        <label>
          <strong>Message:</strong>
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        />
      </div>

      <div style={{ marginBottom: "36px" }}>
        <label>
          <strong>Duration (ms):</strong>
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value, 10))}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            fontSize: "16px",
          }}
        />
      </div>
      <div style={{ marginBottom: "36px" }}>
        <label>
          <strong>Show Close Button:</strong>
        </label>
        <input
          type="checkbox"
          checked={showCloseButton}
          onChange={() => setShowCloseButton(!showCloseButton)}
          style={{ marginTop: "10px", marginLeft: "10px" }}
        />
      </div>
      <div style={{ marginBottom: "36px" }}>
        <label>
          <strong>Type:</strong>
        </label>
        <br />
        <br />
        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="success"
              checked={type === "success"}
              onChange={() => setType("success")}
            />
            Success
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="type"
              value="error"
              checked={type === "error"}
              onChange={() => setType("error")}
            />
            Error
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="type"
              value="warning"
              checked={type === "warning"}
              onChange={() => setType("warning")}
            />
            Warning
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="type"
              value="info"
              checked={type === "info"}
              onChange={() => setType("info")}
            />
            Info
          </label>
        </div>
      </div>
      <div style={{ marginBottom: "36px" }}>
        <label>
          <strong>Position:</strong>
        </label>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "16px",
          }}
        >
          <strong>Vertical:</strong>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="vertical"
              value="top"
              checked={vertical === "top"}
              onChange={() => setVertical("top")}
            />
            Top
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="vertical"
              value="bottom"
              checked={vertical === "bottom"}
              onChange={() => setVertical("bottom")}
            />
            Bottom
          </label>
        </div>
        <div style={{ marginLeft: "16px" }}>
          <strong>Horizontal:</strong>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="horizontal"
              value="left"
              checked={horizontal === "left"}
              onChange={() => setHorizontal("left")}
            />
            Left
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="horizontal"
              value="right"
              checked={horizontal === "right"}
              onChange={() => setHorizontal("right")}
            />
            Right
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="horizontal"
              value="center"
              checked={horizontal === "center"}
              onChange={() => setHorizontal("center")}
            />
            Center
          </label>
        </div>
      </div>

      <div style={{ marginBottom: "36px" }}>
        <label>
          <strong>Enable Sound:</strong>
        </label>
        <input
          type="checkbox"
          checked={soundEnabled}
          onChange={() => setSoundEnabled(!soundEnabled)}
          style={{ marginTop: "10px", marginLeft: "10px" }}
        />
      </div>

      <button
        onClick={showToast}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
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

const App: React.FC = () => (
  <ToastProvider maxToasts={5}>
    <ExamplePage />
  </ToastProvider>
);
export default App;
