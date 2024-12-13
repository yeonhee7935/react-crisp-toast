import React, { useState, useEffect, useRef } from "react";
import { Toast as T, useToast } from "../context/ToastContext";
import "../styles/toast.css";
import CloseIcon from "./CloseIcon";
import { playSound } from "../utils/sound";

interface ToastProps extends T {
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 5000,
  onClose,
  position = { vertical: "top", horizontal: "right" },
  showCloseButton = false,
  soundEnabled = false,
}) => {
  const { soundEnabled: globalSoundEnabled } = useToast();

  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const toastRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (soundEnabled !== undefined ? soundEnabled : globalSoundEnabled) {
      playSound(type);
    }
    timerRef.current = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => onClose(id), 500);
    }, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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

  const { vertical, horizontal } = position;

  return (
    <div
      className={`toast toast-${type} ${horizontal} ${vertical} ${
        isFading ? "fade-out" : ""
      }`}
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
      {showCloseButton && (
        <button className="toast-close" onClick={() => onClose(id)}>
          <CloseIcon size={20} color="#fff" />
        </button>
      )}
    </div>
  );
};

export default Toast;
