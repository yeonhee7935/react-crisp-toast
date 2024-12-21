import { useState, useEffect, useRef } from "react";

export const useSwipe = (onClose: (id: string) => void, id: string) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
      isSwiping.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping.current) return;
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX.current;
      setSwipeOffset(deltaX);
    };

    const handleTouchEnd = () => {
      const threshold = 100; // Swipe threshold
      if (Math.abs(swipeOffset) >= threshold) {
        onClose(id); // Trigger close if swipe exceeds threshold
      }
      setSwipeOffset(0);
      isSwiping.current = false;
    };

    // Attach event listeners
    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchmove", handleTouchMove);
    element.addEventListener("touchend", handleTouchEnd);

    // Cleanup event listeners on unmount
    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onClose, id, swipeOffset]);

  return {
    ref,
    swipeOffset,
  };
};
