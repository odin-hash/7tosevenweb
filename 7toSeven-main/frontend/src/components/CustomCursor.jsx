import React, { useState, useEffect } from 'react';

// Evaluated once at module load — no flash of cursor dot on mobile
function detectTouchDevice() {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

const IS_TOUCH = detectTouchDevice();

function CursorInner() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(!!isInteractive);
    };

    // Failsafe: if a touchstart fires on a hybrid device, hide immediately
    const handleTouch = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference flex items-center justify-center transition-transform duration-75 ease-linear"
      style={{
        transform: `translate3d(calc(${position.x}px - 50%), calc(${position.y}px - 50%), 0)`,
        willChange: 'transform'
      }}
    >
      <div
        className={`bg-white transition-all duration-300 ease-[cubic-bezier(0.2,1,0.2,1)] ${
          isHovering ? 'w-6 h-6 rotate-45 scale-125' : 'w-3 h-3 rotate-0 scale-100'
        }`}
      />
    </div>
  );
}

export default function CustomCursor() {
  // Touch device? Return absolutely nothing — zero DOM, zero listeners.
  if (IS_TOUCH) return null;
  return <CursorInner />;
}
