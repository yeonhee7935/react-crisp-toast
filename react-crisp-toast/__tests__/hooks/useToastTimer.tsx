import { renderHook, act } from "@testing-library/react";
import { useToastTimer } from "@src/hooks/useToastTimer";
import { DEFAULT_FADE_OUT_DURATION } from "@src/constants";

// 모킹 함수
const onCloseMock = vi.fn();

describe("useToastTimer", () => {
  const duration = 1000; 
  const id = "test-toast";

  beforeEach(() => {
    vi.useFakeTimers(); 
    onCloseMock.mockClear(); 
  });

  it("should start the timer and call onClose after duration", () => {
    const { result } = renderHook(() =>
      useToastTimer(duration, id, onCloseMock)
    );

    expect(result.current.isFading).toBe(false);  

    act(() => {
      vi.advanceTimersByTime(duration + DEFAULT_FADE_OUT_DURATION); 
    });

    expect(onCloseMock).toHaveBeenCalledWith(id);
  });

  it("should update isFading to true after duration", () => {
    const { result } = renderHook(() =>
      useToastTimer(duration, id, onCloseMock)
    );

    expect(result.current.isFading).toBe(false); 

    act(() => {
      vi.advanceTimersByTime(duration); 
    });

    expect(result.current.isFading).toBe(true);
  });

  it("should clear the timer when the component is unmounted", () => {
    const { unmount } = renderHook(() =>
      useToastTimer(duration, id, onCloseMock)
    );

    act(() => {
      vi.advanceTimersByTime(duration);
    });

    expect(onCloseMock).toHaveBeenCalledWith(id);
    unmount();
  });
});
