import React, { useState, useEffect, useRef } from "react";
import { Toast as T } from "../context/ToastContext";
import "../styles/toast.css";

interface ToastProps extends T {
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const toastRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

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
    const threshold = 150;

    if (Math.abs(swipeOffset) > threshold) {
      onClose(id);
    } else {
      setSwipeOffset(0);
    }

    setIsSwiping(false);
  };

  return (
    <div
      className={`toast toast-${type}`}
      ref={toastRef}
      style={{
        transform: `translateX(${swipeOffset}px)`,
        transition: isSwiping ? "none" : "transform 0.3s ease-out",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <span>{message}</span>
      <button className="toast-close" onClick={() => onClose(id)}>
        ✖
      </button>
    </div>
  );
};

export default Toast;
