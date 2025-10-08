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

  const isRel = content.type === 'REL';

  return (
    <div
      ref={tooltipRef}
      className="fr-card fr-card--sm fr-card--no-border fr-shadow"
      style={{ 
        position: 'fixed',
        zIndex: 1000,
        maxWidth: '28rem',
        top: position.top, 
        left: position.left, 
        opacity: visible ? 1 : 0, 
        pointerEvents: 'none',
        transition: 'opacity 0.2s',
      }}
    >
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h4 className={`fr-card__title fr-mb-2w ${isRel ? 'fr-text-title--blue-france' : 'fr-text-title--purple-glycine'}`}>
            {content.name}
          </h4>
          <div className="fr-text--sm">
            <div className="fr-mb-1w">
              <span className={`fr-badge fr-badge--sm ${isRel ? 'fr-badge--blue-france' : 'fr-badge--purple-glycine'}`}>
                {content.code}
              </span>
              <span className="fr-badge fr-badge--sm fr-badge--info fr-ml-1w">
                {content.type}
              </span>
            </div>
            <p className="fr-mb-1w fr-text--sm"><strong>Description :</strong> {content.desc}</p>
            <p className="fr-text--xs fr-text-mention--grey">
              <span className="fr-icon-lightbulb-line fr-icon--sm" aria-hidden="true"></span>
              {' '}{content.examples}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;