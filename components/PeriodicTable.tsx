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

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <span aria-hidden="true" className={`fr-icon-check-line ${className}`} />
);

const ElementCell: React.FC<{
    element: ElementData;
    level: number;
    dimension: Dimension;
    isSelected: boolean;
    onClick: () => void;
    onMouseEnter: (e: React.MouseEvent) => void;
    onMouseLeave: () => void;
}> = ({ element, level, isSelected, onClick, onMouseEnter, onMouseLeave }) => {
    
    const cellClasses = `
        periodic-table-cell fr-ratio-1x1
        ${levelColors[level]}
        ${isSelected ? 'dsfr-selected-cell' : ''}
    `;

    return (
        <td 
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ position: 'relative' }}
        >
            <div className={cellClasses}>
                {isSelected && <CheckIcon className="fr-p-1v" style={{ position: 'absolute', top: 0, right: 0 }} />}
                <div className="fr-text--bold fr-text--xs fr-mb-1v">{element.code}</div>
                <div className="fr-text--xs">{element.name}</div>
            </div>
        </td>
    );
};

const PeriodicTable: React.FC<PeriodicTableProps> = ({ data, dimensions, selectedElements, onCellClick, onCellEnter, onCellLeave }) => {
  return (
    <table className="periodic-table">
      <thead>
        <tr>
          <th className="table-header-sticky fr-background-default--grey fr-p-2w fr-text--bold">Niveau</th>
          {dimensions.map((dim) => {
            const isRel = data[0].elements[dim].type === 'REL';
            const headerColor = isRel ? 'fr-background-action-high--blue-france' : 'fr-background-action-high--purple-glycine';
            return (
              <th key={dim} className={`table-header-sticky fr-p-1w fr-text--xs fr-text--bold fr-text-inverted--${isRel ? 'blue-france' : 'purple-glycine'} ${headerColor}`}>
                {DIMENSION_LABELS[dim][0]}
                {DIMENSION_LABELS[dim][1] && <br/>}
                {DIMENSION_LABELS[dim][1]}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map(levelStr => {
          const level = parseInt(levelStr, 10);
          return (
            <tr key={level}>
              <td className={`fr-background-contrast--grey table-level-sticky fr-p-1w fr-text--bold fr-text-align-center`}>
                <div className="fr-h6">{level}</div>
                <div className="fr-text--xs">{data[levelStr].label}</div>
              </td>
              {dimensions.map(dim => (
                <ElementCell 
                    key={`${dim}-${level}`}
                    element={data[levelStr].elements[dim]}
                    level={level}
                    dimension={dim}
                    isSelected={selectedElements[dim] === level}
                    onClick={() => onCellClick(dim, level)}
                    onMouseEnter={(e) => onCellEnter(e, data[levelStr].elements[dim])}
                    onMouseLeave={onCellLeave}
                />
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeriodicTable;