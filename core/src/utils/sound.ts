import { ToastType } from "@src/context/ToastContext";
import success from "@src/assets/success.mp3";
import error from "@src/assets/error.mp3";
import warning from "@src/assets/warning.mp3";
import info from "@src/assets/info.mp3";

const audioMap: Record<ToastType, string> = {
  success: success,
  error: error,
  warning: warning,
  info: info,
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
