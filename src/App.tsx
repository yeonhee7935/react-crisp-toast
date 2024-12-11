import { useToast } from "./context/ToastContext";

const App = () => {
  const { addToast } = useToast();

  const showToast = (
    position:
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right"
      | "top-center"
      | "bottom-center",
  ) => {
    addToast({ message: `Toast at ${position}`, type: "info", position });
  };

  return (
    <div>
      <button onClick={() => showToast("top-left")}>Show Top Left Toast</button>
      <button onClick={() => showToast("top-right")}>
        Show Top Right Toast
      </button>
      <button onClick={() => showToast("bottom-left")}>
        Show Bottom Left Toast
      </button>
      <button onClick={() => showToast("bottom-right")}>
        Show Bottom Right Toast
      </button>
      <button onClick={() => showToast("top-center")}>
        Show Top Center Toast
      </button>
      <button onClick={() => showToast("bottom-center")}>
        Show Bottom Center Toast
      </button>
    </div>
  );
};
export default App;
