import { render, fireEvent } from "@testing-library/react";
import { useSwipe } from "@src/hooks/useSwipe";
import {Mock} from "vitest";

describe("useSwipe", () => {
  let onCloseMock: Mock;
  const id = "test-toast";

  beforeEach(() => {
    onCloseMock = vi.fn();
  });

  const TestComponent = () => {
    const { ref, swipeOffset } = useSwipe(onCloseMock, id);
    return (
      <div ref={ref} data-testid="swipeable">
        Swipe Offset: {swipeOffset}
      </div>
    );
  };

  it("should update swipeOffset on swipe", () => {
    const { getByTestId } = render(<TestComponent />);
    const element = getByTestId("swipeable");

    fireEvent.touchStart(element, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(element, { touches: [{ clientX: 150 }] });

    expect(element.textContent).toContain("Swipe Offset: 50"); // DeltaX = 150 - 100
  });

  it("should call onClose when swipe exceeds threshold", () => {
    const { getByTestId } = render(<TestComponent />);
    const element = getByTestId("swipeable");

    fireEvent.touchStart(element, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(element, { touches: [{ clientX: 250 }] }); // Swipe exceeds threshold (100)
    fireEvent.touchEnd(element);

    expect(onCloseMock).toHaveBeenCalledWith(id);
  });

  it("should reset swipeOffset when swipe does not exceed threshold", () => {
    const { getByTestId } = render(<TestComponent />);
    const element = getByTestId("swipeable");

    fireEvent.touchStart(element, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(element, { touches: [{ clientX: 120 }] }); // Swipe below threshold (20)
    fireEvent.touchEnd(element);

    expect(element.textContent).toContain("Swipe Offset: 0");
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
