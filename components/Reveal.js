import { useEffect, useRef, useState } from 'react';

export default function Reveal({ as: Component = 'div', className = '', children }) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.15
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Component
      ref={elementRef}
      className={`reveal-enter ${visible ? 'reveal-enter-visible' : ''} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
