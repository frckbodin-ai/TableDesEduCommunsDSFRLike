import React, { useMemo } from 'react';
import type { SelectedElements, Dimension } from '../types';
import RadarAnalysisChart from './RadarAnalysisChart';
import { DATA } from '../constants';

interface AnalysisProps {
  selectedData: SelectedElements;
  onReset: () => void;
}

const EPoCScale: React.FC<{ score: number; classification: string }> = ({ score, classification }) => {
    const epocLevels = ["Fermé", "Semi-ouvert", "Minimale", "Partielle", "Semi-complète", "Totale"];
    const levelIndex = Math.floor(score);
    const levelLabel = score === 5 ? epocLevels[5] : epocLevels[levelIndex] || '';

    const classificationTags: Record<string, string> = {
        'REL': 'fr-tag--blue-france',
        'Educommun': 'fr-tag--purple-glycine',
        'Hybride (REL & Educommun)': 'fr-tag--grey',
        'Indéterminé': 'fr-tag--grey'
    };

    return (
        <div className="fr-border-bottom--grey fr-pb-3w fr-mb-3w fr-text-center">
            <h3 className="fr-h4">EPoC</h3>
            <p className="fr-text--sm fr-mb-2w">Échelle de Positionnement des Communs</p>

            <p className="fr-display--md fr-mb-1v">{score.toFixed(2)}<span className="fr-text--lead"> / 5</span></p>
            <p className="fr-text--lg fr-text--bold fr-mb-2w">{levelLabel}</p>
            <p>
                <span className={`fr-tag ${classificationTags[classification]}`}>
                    {classification}
                </span>
            </p>
        </div>
    );
};

const Analysis: React.FC<AnalysisProps> = ({ selectedData, onReset }) => {
  const selectionCount = Object.keys(selectedData).length;

  const { relData, communData } = useMemo(() => {
    const rel: SelectedElements = {};
    const commun: SelectedElements = {};
    Object.entries(selectedData).forEach(([dim, level]) => {
      const dimensionType = DATA[0].elements[dim as Dimension].type;
      if (dimensionType === 'REL') {
        rel[dim as Dimension] = level as number;
      } else {
        commun[dim as Dimension] = level as number;
      }
    });
    return { relData: rel, communData: commun };
  }, [selectedData]);

  const calculateAverage = (data: SelectedElements) => {
    const values = Object.values(data);
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + (val ?? 0), 0);
    return sum / values.length;
  };

  const { epocScore, classification } = useMemo(() => {
    const relCount = Object.keys(relData).length;
    const communCount = Object.keys(communData).length;
    
    let classification = 'Indéterminé';
    if (relCount > 0 && communCount === 0) {
        classification = 'REL';
    } else if (relCount === 0 && communCount > 0) {
        classification = 'Educommun';
    } else if (relCount > 0 && communCount > 0) {
        const relScore = calculateAverage(relData);
        const communScore = calculateAverage(communData);
        if (relScore > communScore * 1.15) {
            classification = 'REL';
        } else if (communScore > relScore * 1.15) {
            classification = 'Educommun';
        } else {
            classification = 'Hybride (REL & Educommun)';
        }
    }
    
    return {
        epocScore: calculateAverage(selectedData),
        classification,
    };
  }, [selectedData, relData, communData]);

  return (
    <div className="fr-card">
      <div className="fr-card__body">
          <div className="fr-card__content">
            <div className="fr-grid-row fr-grid-row--middle fr-grid-row--gutters">
              <div className="fr-col">
                <h2 className="fr-card__title fr-h5">Analyse de Positionnement</h2>
              </div>
              {selectionCount > 0 && (
                <div className="fr-col-auto">
                    <button
                        onClick={onReset}
                        className="fr-btn fr-btn--secondary fr-btn--sm"
                    >
                        Réinitialiser
                    </button>
                </div>
              )}
            </div>
          
            {selectionCount > 0 ? (
                <div className="fr-mt-4w">
                <EPoCScale score={epocScore} classification={classification} />
                
                <div className="fr-grid-row fr-grid-row--gutters">
                    {Object.keys(relData).length > 0 && (
                    <div className="fr-col-12">
                        <h3 className="fr-h6 fr-text-center fr-mb-2w" style={{color: 'var(--text-active-blue-france)'}}>Analyse REL (Ressource)</h3>
                        <div style={{width: '100%', height: '320px'}}>
                        <RadarAnalysisChart selectedData={relData} color="var(--background-active-blue-france)" name="Niveau REL" />
                        </div>
                    </div>
                    )}
                    {Object.keys(communData).length > 0 && (
                    <div className="fr-col-12">
                        <h3 className="fr-h6 fr-text-center fr-mb-2w" style={{color: 'var(--text-active-purple-glycine)'}}>Analyse Commun (Gouvernance)</h3>
                        <div style={{width: '100%', height: '320px'}}>
                        <RadarAnalysisChart selectedData={communData} color="var(--background-action-high-purple-glycine-active)" name="Niveau Commun" />
                        </div>
                    </div>
                    )}
                </div>
                </div>
            ) : (
                <div className="fr-notice fr-notice--info fr-my-8w">
                    <div className="fr-container">
                        <div className="fr-notice__body">
                            <p className="fr-notice__title">Commencez votre analyse</p>
                            <p>
                                Cliquez sur les cases du tableau pour caractériser votre projet. 
                                L'analyse apparaîtra ici.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;