import React, { useEffect, useState, useRef } from 'react';

export const StatsCounter = ({ value, label, prefix = '', suffix = '', duration = 1600 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(numericValue * easeOut);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, numericValue, duration]);

  const formattedCount = Number.isInteger(numericValue)
    ? Math.round(count).toLocaleString()
    : count.toFixed(1);

  return (
    <div ref={elementRef} style={{ textAlign: 'center' }}>
      <div className="stat-counter-val">
        {prefix}{formattedCount}{suffix}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.4rem', letterSpacing: '0.02em', fontWeight: '500' }}>
        {label}
      </div>
    </div>
  );
};
