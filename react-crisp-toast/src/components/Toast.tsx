import React, {useEffect} from "react";
import { Toast as T, useToast } from "@src/context/ToastContext";
import { useSwipe } from "../hooks/useSwipe"; 
import { useToastTimer } from "../hooks/useToastTimer";  
import CloseIcon from "@src/components/CloseIcon";
import { playSound } from "@src/utils/sound";

import {
  DEFAULT_DURATION,
  DEFAULT_POSITION, 
  DEFAULT_TYPE,
} from "../constants";

interface ToastProps extends T {
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = DEFAULT_TYPE,
  duration = DEFAULT_DURATION,
  onClose,
  position = DEFAULT_POSITION,
  showCloseButton = false,
  soundEnabled,
}) => {
  const { soundEnabled: globalSoundEnabled } = useToast();

  const { isSwiping, swipeOffset, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipe(onClose, id);
  const { isFading } = useToastTimer(duration, id, onClose);

  useEffect(() => {
    if (soundEnabled !== undefined ? soundEnabled : globalSoundEnabled) {
      playSound(type);
    }
  }, [soundEnabled, globalSoundEnabled, type]);

  const { vertical, horizontal } = position;

  return (
    <div
      role="alert"
      className={`toast toast-${type} ${horizontal} ${vertical} ${isFading ? "fade-out" : ""}`}
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
