import { describe, it, expect, vi } from "vitest";
 import { render, screen, fireEvent } from "@testing-library/react";
import { ToastProvider, useToast, Toast } from "@src/context/ToastContext";

vi.mock("@src/components/ToastContainer", () => ({
  __esModule: true,
  default: ({
    position,
    toasts,
    removeToast,
  }: {
    position: string;
    toasts: Toast[];
    removeToast: (id: string) => void;
  }) => (
    <div data-testid={`toast-container-${position}`}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          data-testid="toast"
          className={`toast toast-${toast.type}`}
        >
          {toast.message}
          <button
            onClick={() => removeToast(toast.id)}
            data-testid="remove-toast"
          >
            Close
          </button>
        </div>
      ))}
    </div>
  ),
}));

const TestComponent: React.FC = () => {
  const { addToast } = useToast();

  return (
    <button
      onClick={() =>
        addToast({
          message: "Test Toast",
          type: "success",
          position: { vertical: "top", horizontal: "right" },
        })
      }
      data-testid="add-toast"
    >
      Add Toast
    </button>
  );
};

describe("ToastProvider", () => {
  it("renders toasts when added", () => {
    render(
      <ToastProvider maxToasts={3}>
        <TestComponent />
      </ToastProvider>,
    );

    // Add a toast
    fireEvent.click(screen.getByTestId("add-toast"));

    // Check if the toast is rendered
    const toast = screen.getByTestId("toast");
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent("Test Toast");
    expect(toast).toHaveClass("toast-success");
  });

  it("removes a toast when the close button is clicked", () => {
    render(
      <ToastProvider maxToasts={3}>
        <TestComponent />
      </ToastProvider>,
    );

    // Add a toast
    fireEvent.click(screen.getByTestId("add-toast"));

    // Remove the toast
    const removeButton = screen.getByTestId("remove-toast");
    fireEvent.click(removeButton);

    // Check if the toast is removed
    expect(screen.queryByTestId("toast")).not.toBeInTheDocument();
  });

  it("queues toasts when maxToasts is reached", () => {
    render(
      <ToastProvider maxToasts={1}>
        <TestComponent />
      </ToastProvider>,
    );

    // Add multiple toasts
    fireEvent.click(screen.getByTestId("add-toast"));
    fireEvent.click(screen.getByTestId("add-toast"));

    // Only one toast should be visible
    const toasts = screen.getAllByTestId("toast");
    expect(toasts.length).toBe(1);
  });

  it("displays queued toasts when a toast is removed", () => {
    render(
      <ToastProvider maxToasts={1}>
        <TestComponent />
      </ToastProvider>,
    );

    // Add multiple toasts
    fireEvent.click(screen.getByTestId("add-toast"));
    fireEvent.click(screen.getByTestId("add-toast"));

    // Remove the first toast
    fireEvent.click(screen.getByTestId("remove-toast"));

    // Check if the next toast in queue is displayed
    const toast = screen.getByTestId("toast");
    expect(toast).toBeInTheDocument();
  });

  it("throws an error when useToast is used outside ToastProvider", () => {
    const ConsoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {}); // Suppress React error output

    const TestErrorComponent = () => {
      useToast();
      return null;
    };

    expect(() => render(<TestErrorComponent />)).toThrow(
      "useToast must be used within a ToastProvider",
    );

    ConsoleSpy.mockRestore();
  });
});
