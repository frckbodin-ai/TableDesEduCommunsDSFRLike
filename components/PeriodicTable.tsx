import React from 'react';
import type { TableData, Dimension, SelectedElements, ElementData } from '../types';
import { DIMENSION_LABELS } from '../constants';

interface PeriodicTableProps {
  data: TableData;
  dimensions: Dimension[];
  selectedElements: SelectedElements;
  onCellClick: (dimension: Dimension, level: number) => void;
  onCellEnter: (e: React.MouseEvent, element: ElementData) => void;
  onCellLeave: () => void;
}

const levelColors = [
    'fr-background-contrast--error fr-text--contrast--error',
    'fr-background-contrast--warning fr-text--contrast--warning',
    'fr-background-contrast--yellow-tournesol fr-text--contrast--yellow-tournesol',
    'fr-background-contrast--green-emeraude fr-text--contrast--green-emeraude',
    'fr-background-contrast--blue-france fr-text--contrast--blue-france',
    'fr-background-contrast--purple-glycine fr-text--contrast--purple-glycine',
];

// FIX: Add `style` prop to allow inline styling of the icon.
const CheckIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({className, style}) => (
    <span aria-hidden="true" className={`fr-icon-check-line ${className}`} style={style} />
);

const ElementCell: React.FC<{
    element: ElementData;
    level: number;
    levelLabel: string;
    dimensionLabel: string;
    dimension: Dimension;
    isSelected: boolean;
    onClick: () => void;
    onMouseEnter: (e: React.MouseEvent) => void;
    onMouseLeave: () => void;
}> = ({ element, level, levelLabel, dimensionLabel, isSelected, onClick, onMouseEnter, onMouseLeave }) => {
    
    const cellClasses = `
        periodic-table-cell
        ${levelColors[level]}
        ${isSelected ? 'dsfr-selected-cell' : ''}
    `;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent scrolling on spacebar
            onClick();
        }
    };
    
    const ariaLabel = `${element.name} (${dimensionLabel}, Niveau ${level}: ${levelLabel}). Statut: ${isSelected ? 'Sélectionné' : 'Non sélectionné'}`;


    return (
        <td role="gridcell" style={{ verticalAlign: 'top', padding: 0 }}>
            <div
                onClick={onClick}
                onKeyDown={handleKeyDown}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={cellClasses}
                style={{ position: 'relative' }}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={ariaLabel}
            >
                {isSelected && <CheckIcon className="fr-p-1v" style={{ position: 'absolute', top: 0, right: 0 }} />}
                <div style={{width: '100%'}}>
                    <div className="fr-grid-row fr-grid-row--gutters fr-mb-1w">
                        <div className="fr-col-auto fr-text--bold fr-text--sm">{element.code}</div>
                        <div className="fr-col fr-text--bold fr-text--sm" style={{flex: 1}}>{element.name}</div>
                    </div>
                    <p className="fr-text--xs">{element.desc}</p>
                </div>
            </div>
        </td>
    );
};

const PeriodicTable: React.FC<PeriodicTableProps> = ({ data, dimensions, selectedElements, onCellClick, onCellEnter, onCellLeave }) => {
  return (
    <table className="periodic-table" role="grid">
      <thead role="rowgroup">
        <tr role="row">
          <th role="columnheader" className="table-header-sticky fr-background-default--grey fr-p-2w fr-text--bold">Niveau</th>
          {dimensions.map((dim) => {
            const isRel = data[0].elements[dim].type === 'REL';
            const headerColor = isRel ? 'fr-background-action-high--blue-france' : 'fr-background-action-high--purple-glycine';
            return (
              <th role="columnheader" key={dim} className={`table-header-sticky fr-p-1w fr-text--xs fr-text--bold fr-text-inverted--${isRel ? 'blue-france' : 'purple-glycine'} ${headerColor}`}>
                {DIMENSION_LABELS[dim][0]}
                {DIMENSION_LABELS[dim][1] && <br/>}
                {DIMENSION_LABELS[dim][1]}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {Object.keys(data).map(levelStr => {
          const level = parseInt(levelStr, 10);
          const levelLabel = data[levelStr].label;
          return (
            <tr key={level} role="row">
              <td role="rowheader" className={`fr-background-contrast--grey table-level-sticky fr-p-1w fr-text--bold fr-text-align-center`}>
                <div className="fr-h6">{level}</div>
                <div className="fr-text--xs">{levelLabel}</div>
              </td>
              {dimensions.map(dim => {
                const dimensionLabel = DIMENSION_LABELS[dim].join(' ');
                return (
                    <ElementCell 
                        key={`${dim}-${level}`}
                        element={data[levelStr].elements[dim]}
                        level={level}
                        levelLabel={levelLabel}
                        dimensionLabel={dimensionLabel}
                        dimension={dim}
                        isSelected={selectedElements[dim] === level}
                        onClick={() => onCellClick(dim, level)}
                        onMouseEnter={(e) => onCellEnter(e, data[levelStr].elements[dim])}
                        onMouseLeave={onCellLeave}
                    />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeriodicTable;