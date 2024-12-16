import "@testing-library/jest-dom";

import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Toast from "../../src/components/Toast";
import { Toast as ToastType, useToast } from "../../src/context/ToastContext";
import {
  DEFAULT_DURATION,
  DEFAULT_POSITION,
  DEFAULT_FADE_OUT_DURATION,
  DEFAULT_THRESHOLD,
} from "../../src/constants";
import { playSound } from "../../src/utils/sound";

// Mock playSound function to prevent actual sound play during tests
jest.mock("../../src/utils/sound", () => ({
  playSound: jest.fn(),
}));

// Mock the useToast hook to isolate the Toast component from the context
jest.mock("../../src/context/ToastContext", () => ({
  useToast: jest.fn(),
}));

describe("Toast component", () => {
  const mockOnClose = jest.fn();

  const toastProps: ToastType = {
    id: "1",
    message: "Test Toast",
    type: "success",
    duration: DEFAULT_DURATION,
    position: DEFAULT_POSITION,
    showCloseButton: true,
    soundEnabled: false,
  };
  afterEach(() => {
    jest.clearAllMocks(); // This ensures the playSound mock is cleared between tests
  });

  describe("sound effect", () => {
    describe("global soundEnabled={false}", () => {
      beforeEach(() => {
        (useToast as jest.Mock).mockReturnValue({
          soundEnabled: false,
        });
      });
      it("renders the toast with correct message and type", () => {
        act(() => render(<Toast {...toastProps} onClose={mockOnClose} />));

        expect(screen.getByText("Test Toast")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveClass("toast-success");
      });

      it("plays sound when soundEnabled is true", () => {
        act(() =>
          render(
            <Toast {...toastProps} onClose={mockOnClose} soundEnabled={true} />,
          ),
        );

        // Ensure playSound is called for the correct toast type
        expect(playSound).toHaveBeenCalledWith("success");
      });

      it("does not play sound if soundEnabled is not provided", () => {
        act(() => render(<Toast {...toastProps} onClose={mockOnClose} />));

        // Ensure playSound is not called
        expect(playSound).not.toHaveBeenCalled();
      });

      it("does not play sound if soundEnabled is false", () => {
        act(() =>
          render(
            <Toast
              {...toastProps}
              onClose={mockOnClose}
              soundEnabled={false}
            />,
          ),
        );

        // Ensure playSound is not called
        expect(playSound).not.toHaveBeenCalled();
      });
    });

    describe("global soundEnabled={true}", () => {
      beforeEach(() => {
        (useToast as jest.Mock).mockReturnValue({
          soundEnabled: true,
        });
      });

      it("renders the toast with correct message and type", () => {
        act(() => render(<Toast {...toastProps} onClose={mockOnClose} />));

        expect(screen.getByText("Test Toast")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveClass("toast-success");
      });

      it("plays sound when soundEnabled is true", () => {
        act(() =>
          render(
            <Toast {...toastProps} onClose={mockOnClose} soundEnabled={true} />,
          ),
        );

        // Ensure playSound is called for the correct toast type
        expect(playSound).toHaveBeenCalledWith("success");
      });

      it("plays sound if soundEnabled is not provided (using global setting)", () => {
        act(() => render(<Toast {...toastProps} onClose={mockOnClose} />));

        // Ensure playSound is called for the correct toast type
        expect(playSound).not.toHaveBeenCalled();
      });

      it("does not play sound if soundEnabled is false", () => {
        act(() =>
          render(
            <Toast
              {...toastProps}
              onClose={mockOnClose}
              soundEnabled={false}
            />,
          ),
        );

        // Ensure playSound is not called
        expect(playSound).not.toHaveBeenCalled();
      });
    });
  });

  describe("close button", () => {
    it("closes toast when close button is clicked", () => {
      act(() => render(<Toast {...toastProps} onClose={mockOnClose} />));

      const closeButton = screen.getByRole("button");
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledWith("1");
    });

    it("does not display close button if showCloseButton is false", () => {
      const toastWithoutCloseButton = { ...toastProps, showCloseButton: false };

      act(() =>
        render(<Toast {...toastWithoutCloseButton} onClose={mockOnClose} />),
      );

      const closeButton = screen.queryByRole("button");
      expect(closeButton).toBeNull(); // Ensure no close button is rendered
    });
  });

  describe("swipe guesture", () => {
    it("closes the toast when swipe exceeds the threshold", async () => {
      act(() => render(<Toast {...toastProps} onClose={mockOnClose} />));
      const SWIPE_THRESHOLD = DEFAULT_THRESHOLD + 100;
      // Start a swipe gesture
      fireEvent.touchStart(screen.getByRole("alert"), {
        touches: [{ clientX: 0 }],
      });
      fireEvent.touchMove(screen.getByRole("alert"), {
        touches: [{ clientX: SWIPE_THRESHOLD }], // Swipe right
      });

      expect(screen.getByRole("alert")).toHaveStyle(
        `transform: translateX(${SWIPE_THRESHOLD}px)`,
      );

      // End the swipe gesture with threshold exceeded
      fireEvent.touchEnd(screen.getByRole("alert"));
      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalledWith("1");
      });
    });

    it("does not close the toast when swipe does not exceed the threshold", async () => {
      act(() => render(<Toast {...toastProps} onClose={mockOnClose} />));
      const SWIPE_THRESHOLD = DEFAULT_THRESHOLD - 100;
      // Start a swipe gesture
      fireEvent.touchStart(screen.getByRole("alert"), {
        touches: [{ clientX: 0 }],
      });
      fireEvent.touchMove(screen.getByRole("alert"), {
        touches: [{ clientX: SWIPE_THRESHOLD }], // Swipe but not enough to close
      });

      expect(screen.getByRole("alert")).toHaveStyle(
        `transform: translateX(${SWIPE_THRESHOLD}px)`,
      );

      fireEvent.touchEnd(screen.getByRole("alert"));
      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });
  });

  describe("fade out", () => {
    it("handles fade-out effect after duration", async () => {
      jest.useFakeTimers(); // Mock timers for duration
      act(() => render(<Toast {...toastProps} onClose={mockOnClose} />));

      // Fast forward time by duration
      act(() =>
        jest.advanceTimersByTime(DEFAULT_DURATION + DEFAULT_FADE_OUT_DURATION),
      );

      // Check if the toast is fading out
      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveClass("fade-out");
      });

      // Wait for toast to close after the fade-out
      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalledWith("1");
      });

      jest.useRealTimers(); // Restore original timers
    });
  });
});
