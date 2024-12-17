import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { vi, Mock } from "vitest";
import Toast from "@src/components/Toast";
import { Toast as ToastType, useToast } from "@src/context/ToastContext";
import {
  DEFAULT_DURATION,
  DEFAULT_POSITION,
  DEFAULT_FADE_OUT_DURATION,
  DEFAULT_THRESHOLD,
} from "@src/constants";
import { playSound } from "@src/utils/sound";

// Mock playSound function to prevent actual sound play during tests
vi.mock("@src/utils/sound", () => ({
  playSound: vi.fn(),
}));

// Mock the useToast hook to isolate the Toast component from the context
vi.mock("@src/context/ToastContext", () => ({
  useToast: vi.fn(),
}));

describe("Toast component", () => {
  const mockOnClose = vi.fn();

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
    vi.clearAllMocks(); // Ensure mocks are cleared between tests
  });

  describe("sound effect", () => {
    describe("global soundEnabled={false}", () => {
      beforeEach(() => {
        (useToast as Mock).mockReturnValue({
          soundEnabled: false,
        });
      });

      it("renders the toast with correct message and type", () => {
        render(<Toast {...toastProps} onClose={mockOnClose} />);
        expect(screen.getByText("Test Toast")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveClass("toast-success");
      });

      it("plays sound when soundEnabled is true", () => {
        render(
          <Toast {...toastProps} onClose={mockOnClose} soundEnabled={true} />
        );
        expect(playSound).toHaveBeenCalledWith("success");
      });

      it("does not play sound if soundEnabled is not provided", () => {
        render(<Toast {...toastProps} onClose={mockOnClose} />);
        expect(playSound).not.toHaveBeenCalled();
      });

      it("does not play sound if soundEnabled is false", () => {
        render(
          <Toast {...toastProps} onClose={mockOnClose} soundEnabled={false} />
        );
        expect(playSound).not.toHaveBeenCalled();
      });
    });

    describe("global soundEnabled={true}", () => {
      beforeEach(() => {
        (useToast as Mock).mockReturnValue({
          soundEnabled: true,
        });
      });

      it("renders the toast with correct message and type", () => {
        render(<Toast {...toastProps} onClose={mockOnClose} />);
        expect(screen.getByText("Test Toast")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveClass("toast-success");
      });

      it("plays sound when soundEnabled is true", () => {
        render(
          <Toast {...toastProps} onClose={mockOnClose} soundEnabled={true} />
        );
        expect(playSound).toHaveBeenCalledWith("success");
      });

      it("plays sound if soundEnabled is not provided (using global setting)", () => {
        render(<Toast {...toastProps} onClose={mockOnClose} />);
        expect(playSound).not.toHaveBeenCalled();
      });

      it("does not play sound if soundEnabled is false", () => {
        render(
          <Toast {...toastProps} onClose={mockOnClose} soundEnabled={false} />
        );
        expect(playSound).not.toHaveBeenCalled();
      });
    });
  });

  describe("close button", () => {
    it("closes toast when close button is clicked", () => {
      render(<Toast {...toastProps} onClose={mockOnClose} />);
      const closeButton = screen.getByRole("button");
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledWith("1");
    });

    it("does not display close button if showCloseButton is false", () => {
      const toastWithoutCloseButton = { ...toastProps, showCloseButton: false };
      render(<Toast {...toastWithoutCloseButton} onClose={mockOnClose} />);
      const closeButton = screen.queryByRole("button");
      expect(closeButton).toBeNull();
    });
  });

  describe("swipe gesture", () => {
    it("closes the toast when swipe exceeds the threshold", async () => {
      render(<Toast {...toastProps} onClose={mockOnClose} />);
      const SWIPE_THRESHOLD = DEFAULT_THRESHOLD + 100;

      fireEvent.touchStart(screen.getByRole("alert"), {
        touches: [{ clientX: 0 }],
      });
      fireEvent.touchMove(screen.getByRole("alert"), {
        touches: [{ clientX: SWIPE_THRESHOLD }],
      });

      expect(screen.getByRole("alert")).toHaveStyle(
        `transform: translateX(${SWIPE_THRESHOLD}px)`
      );

      fireEvent.touchEnd(screen.getByRole("alert"));
      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalledWith("1");
      });
    });

    it("does not close the toast when swipe does not exceed the threshold", async () => {
      render(<Toast {...toastProps} onClose={mockOnClose} />);
      const SWIPE_THRESHOLD = DEFAULT_THRESHOLD - 100;

      fireEvent.touchStart(screen.getByRole("alert"), {
        touches: [{ clientX: 0 }],
      });
      fireEvent.touchMove(screen.getByRole("alert"), {
        touches: [{ clientX: SWIPE_THRESHOLD }],
      });

      expect(screen.getByRole("alert")).toHaveStyle(
        `transform: translateX(${SWIPE_THRESHOLD}px)`
      );

      fireEvent.touchEnd(screen.getByRole("alert"));
      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });
  });

  describe("fade out", () => {
    it("handles fade-out effect after duration", async () => {
      vi.useFakeTimers();
      render(<Toast {...toastProps} onClose={mockOnClose} />);

      act(() => vi.advanceTimersByTime(DEFAULT_DURATION + DEFAULT_FADE_OUT_DURATION));

      expect(screen.getByRole("alert")).toHaveClass("fade-out");
      expect(mockOnClose).toHaveBeenCalledWith("1");

      vi.useRealTimers();
    });
  });
});
