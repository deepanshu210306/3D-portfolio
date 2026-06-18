import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import './HoverTooltip.css';

const HoverTooltip = ({ label, children, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event) => {
    const offset = 14;
    const tooltipWidth = 160;
    const tooltipHeight = 36;

    let x = event.clientX + offset;
    let y = event.clientY + offset;

    if (x + tooltipWidth > window.innerWidth - 8) {
      x = event.clientX - tooltipWidth - offset;
    }

    if (y + tooltipHeight > window.innerHeight - 8) {
      y = event.clientY - tooltipHeight - offset;
    }

    setPosition({ x, y });
  }, []);

  if (!label) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={`hover-tooltip-trigger ${className}`.trim()}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {visible &&
        createPortal(
          <span
            className="hover-tooltip"
            style={{ left: position.x, top: position.y }}
            role="tooltip"
          >
            {label}
          </span>,
          document.body
        )}
    </span>
  );
};

export default HoverTooltip;
