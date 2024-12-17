import React, { useState } from "react";
import { useToast, ToastProvider } from "react-crisp-toast";

const ExamplePage: React.FC = () => {
  const { addToast } = useToast();

  const [showCloseButton, setShowCloseButton] = useState(false);
  const [message, setMessage] = useState("🍞 Toast time!");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "info",
  );
  const [duration, setDuration] = useState(3000);
  const [vertical, setVertical] = useState<"top" | "bottom">("top");
  const [horizontal, setHorizontal] = useState<"left" | "right" | "center">(
    "right",
  );
  const [soundEnabled, setSoundEnabled] = useState(true);

  const showToast = () => {
    addToast({
      message,
      type,
      duration,
      position: { vertical, horizontal },
      showCloseButton,
      soundEnabled,
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#121212", // Dark background
        borderRadius: "12px",
        color: "#fff", // Light text color
        boxSizing: "border-box", // Ensures padding doesn't cause overflow
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          color: "#FFD700", // Gold color for the title
          marginBottom: "20px", // Reduced margin
          textAlign: "left",
        }}
      >
        React Crisp Toast 🍞
      </h1>
      <p>This is a lightweight toast library for React.</p>
      {/* Message Input Section */}
      <div
        style={{
          marginBottom: "20px", // Reduced margin between boxes
          backgroundColor: "#333", // Dark background for each section
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            fontSize: "1rem",
            display: "block",
            color: "#fff",
            marginBottom: "10px",
          }}
        >
          Message 📝
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #FFD700",
            backgroundColor: "#444", // Darker input background
            color: "#FFD700", // Gold text
            outline: "none",
            boxSizing: "border-box", // Prevents overflow issues
          }}
        />
      </div>

      {/* Duration Input Section */}
      <div
        style={{
          marginBottom: "20px", // Reduced margin
          backgroundColor: "#333",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            fontSize: "1rem",
            display: "block",
            color: "#fff",
            marginBottom: "10px",
          }}
        >
          Duration (ms) ⏳
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value, 10))}
          style={{
            display: "block",
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #FFD700",
            backgroundColor: "#444",
            color: "#FFD700",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Show Close Button Section */}
      <div
        style={{
          marginBottom: "20px", // Reduced margin
          backgroundColor: "#333",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#fff",
          }}
        >
          Show Close Button :
        </label>
        <label className="switch">
          <input
            type="checkbox"
            checked={showCloseButton}
            onChange={() => setShowCloseButton(!showCloseButton)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Type Section */}
      <div
        style={{
          marginBottom: "20px", // Reduced margin
          backgroundColor: "#333",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            fontSize: "1rem",
            display: "block",
            color: "#fff",
            marginBottom: "10px",
          }}
        >
          Type
        </label>
        <div style={{ marginTop: "10px" }}>
          <label
            style={{
              marginBottom: "10px",
              display: "inline-block",
              marginRight: "20px",
              color: "#fff",
            }}
          >
            <input
              type="radio"
              name="type"
              value="success"
              checked={type === "success"}
              onChange={() => setType("success")}
            />
            Success
          </label>
          <label
            style={{
              marginBottom: "10px",
              display: "inline-block",
              marginRight: "20px",
              color: "#fff",
            }}
          >
            <input
              type="radio"
              name="type"
              value="error"
              checked={type === "error"}
              onChange={() => setType("error")}
            />
            Error
          </label>
          <label
            style={{
              marginBottom: "10px",
              display: "inline-block",
              marginRight: "20px",
              color: "#fff",
            }}
          >
            <input
              type="radio"
              name="type"
              value="warning"
              checked={type === "warning"}
              onChange={() => setType("warning")}
            />
            Warning
          </label>
          <label
            style={{
              marginBottom: "10px",
              display: "inline-block",
              marginRight: "20px",
              color: "#fff",
            }}
          >
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

      {/* Position Section */}
      <div
        style={{
          marginBottom: "20px", // Reduced margin
          backgroundColor: "#333",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            fontSize: "1rem",
            display: "block",
            color: "#fff",
            marginBottom: "10px",
          }}
        >
          Position
        </label>
        <div style={{ marginTop: "10px" }}>
          <label
            style={{
              marginBottom: "10px",
              display: "inline-block",
              marginRight: "20px",
              color: "#fff",
            }}
          >
            - Vertical
          </label>
          <label
            style={{
              marginBottom: "10px",
              display: "inline-block",
              marginRight: "20px",
            }}
          >
            <input
              type="radio"
              name="vertical"
              value="top"
              checked={vertical === "top"}
              onChange={() => setVertical("top")}
            />
            Top
          </label>
          <label
            style={{
              marginBottom: "10px",
              display: "inline-block",
              marginRight: "20px",
            }}
          >
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
        <div style={{ marginTop: "10px" }}>
          <label
            style={{
              marginBottom: "10px",
              display: "inline-block",
              marginRight: "20px",
              color: "#fff",
            }}
          >
            - Horizontal
          </label>
          <label
            style={{
              marginBottom: "10px",
              display: "inline-block",
              marginRight: "20px",
            }}
          >
            <input
              type="radio"
              name="horizontal"
              value="left"
              checked={horizontal === "left"}
              onChange={() => setHorizontal("left")}
            />
            Left
          </label>
          <label
            style={{
              marginBottom: "10px",
              display: "inline-block",
              marginRight: "20px",
            }}
          >
            <input
              type="radio"
              name="horizontal"
              value="right"
              checked={horizontal === "right"}
              onChange={() => setHorizontal("right")}
            />
            Right
          </label>
          <label
            style={{
              marginBottom: "10px",
              display: "inline-block",
              marginRight: "20px",
            }}
          >
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

      {/* Enable Sound Section */}
      <div
        style={{
          marginBottom: "20px", // Reduced margin
          backgroundColor: "#333",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#fff",
          }}
        >
          Enable Sound 🔊:
        </label>
        <label className="switch">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={() => setSoundEnabled(!soundEnabled)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Show Toast Button */}
      <button
        onClick={showToast}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: "#FFD700",
          color: "#121212",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background-color 0.3s",
        }}
      >
        Show Toast
      </button>
    </div>
  );
};

const App: React.FC = () => (
  <div style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
    <ToastProvider maxToasts={5}>
      <ExamplePage />
    </ToastProvider>
  </div>
);

export default App;
