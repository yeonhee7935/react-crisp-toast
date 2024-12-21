import { DEFAULT_FADE_OUT_DURATION } from "@src/constants";
import { useEffect, useRef, useState } from "react";

export const useToastTimer = (
  duration: number,
  id: string,
  onClose: (id: string) => void
) => {
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => onClose(id), DEFAULT_FADE_OUT_DURATION); // Fade-out duration
    }, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, id, onClose]);

  return {
    isFading,
  };
};
