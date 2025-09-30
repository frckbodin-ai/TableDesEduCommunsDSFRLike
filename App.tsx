import React, { useState, useCallback } from 'react';
import { DATA, DIMENSIONS } from './constants';
import type { SelectedElements, TooltipData, Dimension, ElementData } from './types';
import PeriodicTable from './components/PeriodicTable';
import Analysis from './components/Analysis';
import Header from './components/Header';
import Tooltip from './components/Tooltip';

function App() {
  const [selectedElements, setSelectedElements] = useState<SelectedElements>({});
  const [tooltip, setTooltip] = useState<TooltipData>({ visible: false, content: null, x: 0, y: 0 });

  const handleCellClick = useCallback((dimension: Dimension, level: number) => {
    setSelectedElements(prev => {
      const newSelections = { ...prev };
      if (newSelections[dimension] === level) {
        delete newSelections[dimension]; // Unselect if clicked again
      } else {
        newSelections[dimension] = level;
      }
      return newSelections;
    });
  }, []);

  const handleReset = useCallback(() => {
    setSelectedElements({});
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent, element: ElementData) => {
    const content = {
        name: element.name,
        code: element.code,
        type: element.type,
        desc: element.desc,
        examples: element.examples,
    };
    setTooltip({ visible: true, content, x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (tooltip.visible) {
      setTooltip(t => ({ ...t, x: e.clientX, y: e.clientY }));
    }
  }, [tooltip.visible]);

  const handleMouseLeave = useCallback(() => {
    setTooltip(t => ({ ...t, visible: false }));
  }, []);
  
  return (
    <div onMouseMove={handleMouseMove}>
      <Header />
      <main role="main" id="main-content">
        <div className="fr-container fr-py-8w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-xl-8">
               <div className="periodic-table-wrapper fr-background-default--grey fr-p-2w fr-card fr-card--no-border">
                <PeriodicTable 
                  data={DATA} 
                  dimensions={DIMENSIONS} 
                  selectedElements={selectedElements} 
                  onCellClick={handleCellClick}
                  onCellEnter={handleMouseEnter}
                  onCellLeave={handleMouseLeave}
                />
              </div>
            </div>
            
            <div className="fr-col-12 fr-col-xl-4">
               <div style={{ position: 'sticky', top: '2rem' }}>
                 <Analysis selectedData={selectedElements} onReset={handleReset} />
               </div>
            </div>
          </div>
        </div>
      </main>
      <Tooltip tooltipData={tooltip} />
    </div>
  );
}

export default App;