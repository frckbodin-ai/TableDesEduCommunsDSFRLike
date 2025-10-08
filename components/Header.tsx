import React from 'react';

const LegendItem: React.FC<{ level: number, text: string }> = ({ level, text }) => {
    const colors = [
        'fr-background-contrast--error',
        'fr-background-contrast--warning',
        'fr-background-contrast--yellow-tournesol',
        'fr-background-contrast--green-emeraude',
        'fr-background-contrast--blue-france',
        'fr-background-contrast--purple-glycine',
    ];

    return (
        <div className="fr-col-6 fr-col-sm-4 fr-col-md-2">
            <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
                <div className={`fr-mr-1w ${colors[level]}`} style={{ width: '1.25rem', height: '1.25rem' }}></div>
                <span className="fr-text--sm fr-text--bold">{level} - {text}</span>
            </div>
        </div>
    );
};

const Header: React.FC = () => {
    return (
        <header role="banner" className="fr-header">
            <div className="fr-header__body">
                <div className="fr-container">
                    <div className="fr-header__body-row">
                        <div className="fr-header__brand fr-enlarge-link">
                            <div className="fr-header__brand-top">
                                <div className="fr-header__logo">
                                    <p className="fr-logo">
                                        République
                                        <br />Française
                                    </p>
                                </div>
                            </div>
                            <div className="fr-header__service">
                                <a href="/" title="Accueil - Tableau Périodique des EduCommuns">
                                    <p className="fr-header__service-title">Tableau Périodique des EduCommuns</p>
                                </a>
                                <p className="fr-header__service-tagline">Grille d'évaluation interactive de l'ouverture des ressources éducatives</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Ajout d'un séparateur visuel */}
            <div className="fr-container fr-py-4w">
                <div className="fr-mb-3w">
                    <div className="fr-callout">
                        <h3 className="fr-callout__title">
                            <span className="fr-icon-information-line" aria-hidden="true"></span>
                            Comment utiliser ce tableau ?
                        </h3>
                        <p className="fr-callout__text">
                            Cliquez sur les cases correspondant à votre projet. Votre analyse s'affichera automatiquement à droite.
                        </p>
                    </div>
                </div>

                <div className="fr-mb-4w">
                    <h3 className="fr-h6 fr-mb-2w fr-text-center">Niveaux d'ouverture</h3>
                    <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
                        <LegendItem level={0} text="Fermé" />
                        <LegendItem level={1} text="Semi-ouvert" />
                        <LegendItem level={2} text="Minimale" />
                        <LegendItem level={3} text="Partielle" />
                        <LegendItem level={4} text="Semi-complète" />
                        <LegendItem level={5} text="Totale" />
                    </div>
                </div>

                <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
                    <div className="fr-col-auto">
                        <p className="fr-badge fr-badge--blue-france">
                            <span aria-hidden="true" className="fr-icon-book-line fr-icon--sm fr-mr-1v"></span>
                            REL - Ressource
                        </p>
                    </div>
                    <div className="fr-col-auto">
                        <p className="fr-badge fr-badge--purple-glycine">
                             <span aria-hidden="true" className="fr-icon-team-line fr-icon--sm fr-mr-1v"></span>
                            Commun - Gouvernance
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;