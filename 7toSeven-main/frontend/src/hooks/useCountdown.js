import { useState, useEffect } from 'react';

export function useCountdown(targetDateStr) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const target = new Date(targetDateStr).getTime();
    let animationFrameId;

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const milliseconds = Math.floor((distance % 1000) / 10); // 2 digits (centiseconds basically)

      setTimeLeft({ days, hours, minutes, seconds, milliseconds, isExpired: false });
      
      // Use setTimeout for ~30fps update to save battery while preserving millisecond illusion
      // Or requestAnimationFrame for 60fps
      animationFrameId = requestAnimationFrame(updateTimer);
    };

    animationFrameId = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetDateStr]);

  return timeLeft;
}
