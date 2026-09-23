import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const { cursorState } = useApp();
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []); // Empty deps - no stale closure issue now

  if (!isVisible) return null;

  return (
    <div
      className={`custom-cursor ${cursorState.active ? 'card-hover' : ''}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        opacity: isVisible ? 1 : 0
      }}
    >
      {cursorState.active && (
        <span>{cursorState.text || 'VIEW RESIDENCE →'}</span>
      )}
    </div>
  );
};
