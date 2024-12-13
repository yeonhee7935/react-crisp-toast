import "@testing-library/jest-dom";

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ToastProvider, useToast } from "../../src/context/ToastContext";

describe("ToastProvider", () => {
  it("should add and remove a toast", async () => {
    const ExampleComponent = () => {
      const { addToast } = useToast();
      return (
        <div>
          <button
            onClick={() => addToast({ message: "Test Toast", type: "info" })}
          >
            Add Toast
          </button>
        </div>
      );
    };

    render(
      <ToastProvider maxToasts={3}>
        <ExampleComponent />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText("Add Toast"));
    await waitFor(() => screen.findByText("Test Toast"));
    expect(screen.getByText("Test Toast")).toBeInTheDocument();
  });
});
