import React, { useState, useRef } from "react";

export const useSwipe = (onClose: (id: string) => void, id: string) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const startX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX.current;
    setSwipeOffset(deltaX);
  };

  const handleTouchEnd = () => {
    const threshold = 100; // Default threshold for swipe to close
    if (Math.abs(swipeOffset) >= threshold) {
      onClose(id);
    } else {
      setSwipeOffset(0);
    }
    setIsSwiping(false);
  };

  return {
    isSwiping,
    swipeOffset,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
