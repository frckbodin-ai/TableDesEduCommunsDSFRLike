import React, { useMemo } from 'react';
import type { SelectedElements, Dimension } from '../types';
import RadarAnalysisChart from './RadarAnalysisChart';
import { DATA } from '../constants';

interface AnalysisProps {
  selectedData: SelectedElements;
  onReset: () => void;
}

const EPoCScale: React.FC<{ score: number; classification: string; isEducommun: boolean }> = ({ score, classification, isEducommun }) => {
    const epocLevels = ["Fermé", "Semi-ouvert", "Minimale", "Partielle", "Semi-complète", "Totale"];
    const levelIndex = Math.floor(score);
    const levelLabel = score === 5 ? epocLevels[5] : epocLevels[levelIndex] || '';

    const classificationConfig: Record<string, {tag: string; icon: string}> = {
        'REL': { tag: 'fr-badge--blue-france', icon: 'fr-icon-book-line' },
        'Commun': { tag: 'fr-badge--purple-glycine', icon: 'fr-icon-team-line' },
        'Hybride (REL & Commun)': { tag: 'fr-badge--info', icon: 'fr-icon-exchange-line' },
        'Indéterminé': { tag: 'fr-badge--grey', icon: 'fr-icon-question-line' }
    };

    const config = classificationConfig[classification] || classificationConfig['Indéterminé'];

    return (
        <div className="fr-highlight fr-mb-3w">
            <h3 className="fr-h5 fr-mb-2w">EPoC</h3>
            <p className="fr-text--sm fr-mb-3w">Échelle de Positionnement des Communs</p>

            <div className="fr-text-center">
                <p className="fr-display-xl fr-mb-1v">{score.toFixed(2)}<span className="fr-text--lead"> / 5</span></p>
                <p className="fr-text--lg fr-text--bold fr-mb-2w">{levelLabel}</p>
                <p>
                    <span className={`fr-badge ${config.tag}`}>
                        <span className={`${config.icon} fr-icon--sm`} aria-hidden="true"></span>
                        {' '}{classification}
                    </span>
                </p>
                {isEducommun && (
                    <p className="fr-mt-2w">
                        <span className="fr-badge fr-badge--success">
                            <span className="fr-icon-award-line fr-icon--sm" aria-hidden="true"></span>
                            {' '}Qualifié Educommun
                        </span>
                    </p>
                )}
            </div>
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

  const { epocScore, classification, isEducommun } = useMemo(() => {
    const relCount = Object.keys(relData).length;
    const communCount = Object.keys(communData).length;
    const currentEpocScore = calculateAverage(selectedData);
    
    let currentClassification = 'Indéterminé';
    if (relCount > 0 && communCount === 0) {
        currentClassification = 'REL';
    } else if (relCount === 0 && communCount > 0) {
        currentClassification = 'Commun';
    } else if (relCount > 0 && communCount > 0) {
        const relScore = calculateAverage(relData);
        const communScore = calculateAverage(communData);
        if (relScore > communScore * 1.15) {
            currentClassification = 'REL';
        } else if (communScore > relScore * 1.15) {
            currentClassification = 'Commun';
        } else {
            currentClassification = 'Hybride (REL & Commun)';
        }
    }
    
    return {
        epocScore: currentEpocScore,
        classification: currentClassification,
        isEducommun: currentEpocScore >= 2 && selectionCount > 0,
    };
  }, [selectedData, relData, communData, selectionCount]);

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
                <EPoCScale score={epocScore} classification={classification} isEducommun={isEducommun} />
                
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
                        <h3 className="fr-h6 fr-text-center fr-mb-2w" style={{color: 'var(--text-active-purple-glycine)'}}>Analyse Commun (Organisation)</h3>
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