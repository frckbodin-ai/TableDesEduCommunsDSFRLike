import React, { useRef, useEffect, useState } from 'react';
import type { TooltipData } from '../types';

interface TooltipProps {
  tooltipData: TooltipData;
}

const Tooltip: React.FC<TooltipProps> = ({ tooltipData }) => {
  const { visible, content, x, y } = tooltipData;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (visible && tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      let newX = x + 20;
      let newY = y - 10;

      if (newX + tooltipRect.width > window.innerWidth) {
        newX = x - tooltipRect.width - 20;
      }
      if (newY + tooltipRect.height > window.innerHeight) {
        newY = y - tooltipRect.height - 10;
      }
      if (newY < 0) {
        newY = 10;
      }

      setPosition({ top: newY, left: newX });
    }
  }, [x, y, visible]);
  
  if (!visible || !content) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className="fr-p-2w fr-background-contrast--grey fr-shadow-lg"
      style={{ 
        position: 'fixed',
        zIndex: 50,
        maxWidth: '24rem',
        top: position.top, 
        left: position.left, 
        opacity: visible ? 1 : 0, 
        pointerEvents: 'none',
        transition: 'opacity 0.2s',
      }}
    >
      <h4 className="fr-h6 fr-mb-2w" style={{color: 'var(--text-active-blue-france)'}}>{content.name}</h4>
      <div className="fr-text--sm">
        <p className="fr-mb-1w"><span className="fr-text--bold">Code:</span> {content.code}</p>
        <p className="fr-mb-1w"><span className="fr-text--bold">Type:</span> {content.type}</p>
        <p className="fr-mb-1w"><span className="fr-text--bold">Description:</span> {content.desc}</p>
        <p className="fr-text--italic"><span className="fr-text--bold fr-text--mention--grey">Exemples:</span> {content.examples}</p>
      </div>
    </div>
  );
};

export default Tooltip;