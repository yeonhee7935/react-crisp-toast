import { ToastType } from "../context/ToastContext";

const audioMap: Record<ToastType, string> = {
  success: "/sounds/success.mp3",
  error: "/sounds/error.mp3",
  warning: "/sounds/warning.mp3",
  info: "/sounds/info.mp3",
};

/**
 * Plays a sound based on the given type.
 * @param type - The type of toast (success, error, warning, info).
 */
export const playSound = (type: ToastType) => {
  const audioSrc = audioMap[type];
  if (audioSrc) {
    const audio = new Audio(audioSrc);
    audio.play().catch((err) => console.error("Failed to play sound:", err));
  } else {
    console.warn(`No sound file mapped for type: ${type}`);
  }
};
