import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="fr-footer" role="contentinfo">
            <div className="fr-container">
                <div className="fr-footer__body">
                    <div className="fr-footer__brand fr-enlarge-link">
                        <p className="fr-logo">
                            République
                            <br />Française
                        </p>
                    </div>
                    <div className="fr-footer__content">
                        <p className="fr-footer__content-desc">
                            Basé sur les travaux de Michel Briand sur les communs numériques éducatifs.
                        </p>
                        <ul className="fr-footer__content-list">
                            <li className="fr-footer__content-item">
                                <a className="fr-footer__content-link" href="https://github.com/..." target="_blank" rel="noopener noreferrer">
                                    <span className="fr-icon-github-fill" aria-hidden="true"></span>
                                    Code source
                                </a>
                            </li>
                            <li className="fr-footer__content-item">
                                <a className="fr-footer__content-link" href="#">
                                    Documentation
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="fr-footer__bottom">
                    <ul className="fr-footer__bottom-list">
                        <li className="fr-footer__bottom-item">
                            <a className="fr-footer__bottom-link" href="#">Accessibilité : partiellement conforme</a>
                        </li>
                        <li className="fr-footer__bottom-item">
                            <a className="fr-footer__bottom-link" href="#">Mentions légales</a>
                        </li>
                    </ul>
                    <div className="fr-footer__bottom-copy">
                        <p>Version 2.0 - 2025</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;