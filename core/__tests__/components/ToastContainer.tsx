import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ToastContainer from "../../src/components/ToastContainer";
import {
  Toast as ToastType,
  ToastProvider,
} from "../../src/context/ToastContext";

describe("ToastContainer", () => {
  const mockRemoveToast = jest.fn();

  const toasts: ToastType[] = [
    {
      id: "1",
      message: "Toast 1",
      type: "success",
      duration: 3000,
      position: { vertical: "top", horizontal: "right" },
      showCloseButton: true,
      soundEnabled: false,
    },
    {
      id: "2",
      message: "Toast 2",
      type: "error",
      duration: 3000,
      position: { vertical: "top", horizontal: "right" },
      showCloseButton: false,
      soundEnabled: false,
    },
  ];

  it("renders ToastContainer with toasts", () => {
    render(
      <ToastProvider>
        <ToastContainer
          toasts={toasts}
          removeToast={mockRemoveToast}
          position="top-right"
        />
      </ToastProvider>,
    );

    // Check if toast messages are rendered
    expect(screen.getByText("Toast 1")).toBeInTheDocument();
    expect(screen.getByText("Toast 2")).toBeInTheDocument();
  });

  it("calls removeToast when close button is clicked", () => {
    render(
      <ToastProvider>
        <ToastContainer
          toasts={toasts}
          removeToast={mockRemoveToast}
          position="top-right"
        />
      </ToastProvider>,
    );

    const closeButton = screen.getAllByRole("button")[0]; // Get the first close button
    fireEvent.click(closeButton);

    // Check if the removeToast function was called with the correct toast id
    expect(mockRemoveToast).toHaveBeenCalledWith("1");
  });

  it("does not display close button if showCloseButton is false", () => {
    render(
      <ToastProvider>
        <ToastContainer
          toasts={toasts}
          removeToast={mockRemoveToast}
          position="top-right"
        />
      </ToastProvider>,
    );

    // Check if the second toast (with showCloseButton: false) has no close button
    const closeButtons = screen.queryAllByRole("button");
    expect(closeButtons.length).toBe(1); // Only 1 close button should be present
  });
});
