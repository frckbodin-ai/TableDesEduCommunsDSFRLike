import { TableData, Dimension } from './types';

export const DIMENSIONS: Dimension[] = [
  'logiciel', 
  'contenus', 
  'pedagogique',
  'infrastructure', 
  'interoperabilite', 
  'processus', 
  'economique', 
  'participation', 
  'pluralite', 
  'autonomisation', 
];

export const DIMENSION_LABELS: Record<Dimension, string[]> = {
  logiciel: ['Logiciel', '(Code Source)'],
  contenus: ['Contenus', '(Ressources)'],
  infrastructure: ['Infrastructure', ''],
  interoperabilite: ['Interopérabilité', ''],
  processus: ['Processus', 'Décisionnel'],
  economique: ['Modèle', 'Économique'],
  participation: ['Participation', ''],
  pluralite: ['Pluralité', ''],
  autonomisation: ['Autonomisation', ''],
  pedagogique: ['Ancrage', 'Pédagogique'],
};

export const DATA: TableData = {
    "0": {
        label: "Fermé",
        description: "Ressources et processus complètement fermés, contrôlés par un acteur unique sans transparence ni participation possible.",
        elements: {
            logiciel: { code: "Cs-Pr", name: "Copyright Propriétaire", desc: "Code source propriétaire, non accessible ou aucune licence affichée", type: "REL", examples: "Logiciels propriétaires sans accès au code source", weight: 0 },
            contenus: { code: "Co-CR", name: "Contenus Réservés", desc: "Tous droits réservés ou aucune licence affichée", type: "REL", examples: "Contenus sous copyright strict, pas de réutilisation autorisée", weight: 0 },
            infrastructure: { code: "If-Pr", name: "Infrastructure Privative Fermée", desc: "Serveurs propriétaires sans transparence sur les traitements, absence de garanties d'accès aux données ou de portabilité", type: "REL", examples: "Plateformes cloud propriétaires sans API, données verrouillées", weight: 0 },
            interoperabilite: { code: "In-Fe", name: "Interopérabilité fermée", desc: "Formats propriétaires, verrouillés", type: "REL", examples: "Formats .docx, .pptx, .psd sans compatibilité", weight: 0 },
            processus: { code: "De-IFe", name: "Pilotage, décisions Internes Fermés", desc: "Décisions internes, sans publicité", type: "Commun", examples: "Décisions prises en interne sans consultation ni transparence", weight: 0 },
            economique: { code: "Ec-MaF", name: "Modèle Marchand Fermé", desc: "Basé sur la vente, l'abonnement ou la captation de données ; dépendance totale à un acteur privé", type: "Commun", examples: "Modèles freemium, abonnements, vente de données personnelles", weight: 0 },
            participation: { code: "Pa-No", name: "Non participation", desc: "Aucune participation des usagers ou d'acteurs tiers", type: "Commun", examples: "Pas de feedback possible, pas de contribution autorisée", weight: 0 },
            pluralite: { code: "Pl-No", name: "Aucun profil utilisateur", desc: "Aucun profil utilisateur impliqué", type: "Commun", examples: "Développement et décisions par un seul type d'acteur", weight: 0 },
            autonomisation: { code: "Au-No", name: "Simple consommateur", desc: "L'usager est simple consommateur. Aucun droit, pas d'outil d'édition, pas de documentation, pas de possibilité d'interaction ou de signalement", type: "Commun", examples: "Utilisation passive uniquement, pas d'outils de contribution", weight: 0 },
            pedagogique: { code: "Pé-No", name: "Aucun ancrage", desc: "Aucun lien avec des pratiques d'enseignement", type: "REL", examples: "Ressources génériques sans contexte pédagogique", weight: 0 }
        }
    },
    "1": {
        label: "Semi-ouvert",
        description: "Début d'ouverture avec des restrictions importantes, transparence limitée et participation symbolique.",
        elements: {
            logiciel: { code: "Cs-LRs", name: "Source Ouverte Restreinte", desc: "Ex : CC BY-NC, Licence 'source visible'. Code lisible mais modification, réutilisation ou partage restreint", type: "REL", examples: "Licences 'source available', restrictions commerciales ou de modification", weight: 1 },
            contenus: { code: "Co-Rs", name: "Licence Restrictive", desc: "Ex : CC BY-ND - ressource consultable, téléchargeable, non modifiable, non adaptable, non dérivable", type: "REL", examples: "CC BY-NC-ND, licences avec restrictions d'usage", weight: 1 },
            infrastructure: { code: "If-Hb", name: "Infrastructure Hybride", desc: "Sous Contrôle Propriétaire ; Services cloud public ou mixte, avec clauses mais architecture, code et données sous contrôle tiers", type: "REL", examples: "Cloud hybride avec quelques garanties contractuelles", weight: 1 },
            interoperabilite: { code: "In-OP", name: "Formats ouverts partiels", desc: "Peu ou pas de métadonnées", type: "REL", examples: "PDF, JPEG, MP4 sans métadonnées structurées", weight: 1 },
            processus: { code: "De-ISy", name: "Décisions internes non publiées", desc: "Concertation limitée ou symbolique", type: "Commun", examples: "Consultations fermées, feedback sans garantie de prise en compte", weight: 1 },
            economique: { code: "Ec-SuP", name: "Modèle Subventionné Ponctuellement", desc: "Pas de modèle de durabilité explicite", type: "Commun", examples: "Financement sur projet sans stratégie à long terme", weight: 1 },
            participation: { code: "Pa-Fe", name: "Feedbacks utilisateurs", desc: "Acceptés sans transparence sur la prise en compte", type: "Commun", examples: "Formulaires de contact, enquêtes de satisfaction", weight: 1 },
            pluralite: { code: "Pl-Ho", name: "Implication informelle", desc: "Profils homogènes", type: "Commun", examples: "Participation limitée à un cercle restreint et similaire", weight: 1 },
            autonomisation: { code: "Au-Un", name: "Accès unidirectionnel", desc: "La ressource est lisible ou téléchargeable. Commentaires partiels. Absence de droits et d'interface de modification. Documentation minimale ou absente", type: "Commun", examples: "Consultation et téléchargement, commentaires basiques", weight: 1 },
            pedagogique: { code: "Pé-Is", name: "Ressources isolées", desc: "Ressources isolées, non scénarisées", type: "REL", examples: "Documents pédagogiques sans contexte d'usage", weight: 1 }
        }
    },
    "2": {
        label: "Ouverture minimale",
        description: "REL minimale avec licences libres de base, infrastructure contrôlée mais avec quelques garanties d'accès.",
        elements: {
            logiciel: { code: "Cs-Pm", name: "Licence Libre Permissive", desc: "Ex : MIT, Apache 2.0, BSD - Réutilisation libre sans réciprocité requise", type: "REL", examples: "MIT, Apache, BSD - modification et redistribution libres", weight: 2 },
            contenus: { code: "Co-LRsC", name: "Licence Libre avec Restriction Commerciale", desc: "Ex : CC BY-NC, CC BY-NC-SA - pas de réutilisation commerciale", type: "REL", examples: "CC BY-NC, CC BY-NC-SA - libre sauf usage commercial", weight: 2 },
            infrastructure: { code: "If-Oc", name: "Infrastructure Ouverte Contrôlée", desc: "Hébergement par prestataires avec exigences contractuelles : accès aux données, réversibilité, possibilités audits utilisation logiciels libres", type: "REL", examples: "Cloud avec garanties de portabilité et d'audit", weight: 2 },
            interoperabilite: { code: "In-MdNo", name: "Métadonnées Non-standards", desc: "Formats de description incomplets, non exploitables ou propriétaires", type: "REL", examples: "Métadonnées partielles, formats de description limités", weight: 2 },
            processus: { code: "De-CLi", name: "Gouvernance Centralisée", desc: "Processus non formalisés avec ouverture et transparence limitée à certains acteurs (ex: experts)", type: "Commun", examples: "Comités d'experts, décisions centralisées avec consultation limitée", weight: 2 },
            economique: { code: "EC-MiPP", name: "Financement Mixte Public Privé", desc: "Sans stratégie de pérennisation ni gouvernance économique partagée", type: "Commun", examples: "Partenariats public-privé sans modèle de durabilité", weight: 2 },
            participation: { code: "Pa-FeRe", name: "Feedback avec retours", desc: "Sans co-construction", type: "Commun", examples: "Retours utilisateurs pris en compte mais pas de co-création", weight: 2 },
            pluralite: { code: "Pl-Res", name: "Acteurs peu divers", desc: "Ex : experts ou institutionnels", type: "Commun", examples: "Participation limitée aux experts du domaine", weight: 2 },
            autonomisation: { code: "Au-lim", name: "Contribution limitée", desc: "Possibilité de signaler des erreurs ou de proposer des suggestions via formulaire ou contact. Pas de coédition. Documentation partielle ou trop technique. Pas d'espace communautaire", type: "Commun", examples: "Signalement d'erreurs, suggestions via formulaire", weight: 2 },
            pedagogique: { code: "Pé-Ok", name: "Ressources brutes", desc: "Usages possibles mais non outillés", type: "REL", examples: "Ressources utilisables mais sans guide d'usage pédagogique", weight: 2 }
        }
    },
    "3": {
        label: "Ouverture partielle",
        description: "REL ouverte avec licences libres, infrastructure souveraine et début de gouvernance participative.",
        elements: {
            logiciel: { code: "CS-Rc", name: "Licence Libre Réciproque", desc: "Ex : GPL, AGPL, CeCILL - Obligation de partager les modifications (copyleft)", type: "REL", examples: "GPL, AGPL - modifications doivent être partagées", weight: 3 },
            contenus: { code: "Co-Pm", name: "Licence Libre Permissive", desc: "Ex : CC BY, CC0 - réutilisation libre sans réciprocité", type: "REL", examples: "CC BY, CC0 - réutilisation totalement libre", weight: 3 },
            infrastructure: { code: "If-So", name: "Infrastructure Souveraine", desc: "Serveurs publics ou partenaires certifiés (SecNumCloud, etc.), logiciels sous licences libres ou mixtes, avec gouvernance étatique. Portabilité et auditabilité", type: "REL", examples: "Hébergement public, certification SecNumCloud, logiciels libres", weight: 3 },
            interoperabilite: { code: "In-MdSt", name: "Métadonnées Standards Simples", desc: "Ex : Dublin Core, formats ouverts MD, HTML, ODT...", type: "REL", examples: "Dublin Core, formats HTML, ODT, CSV avec métadonnées", weight: 3 },
            processus: { code: "De-O", name: "Gouvernance Ouverte", desc: "Décisions publiques et mécanismes de participation Ex: quelques rôles définis, participation possible", type: "Commun", examples: "Processus décisionnels transparents, rôles définis", weight: 3 },
            economique: { code: "EC-Cop", name: "Modèle Coopératif", desc: "Ou communautaire partiel, avec contributions bénévoles et services", type: "Commun", examples: "Coopératives, modèles communautaires avec services payants", weight: 3 },
            participation: { code: "Pa-Mod", name: "Possibilité de modification", desc: "Ou d'Enrichissement sous validation", type: "Commun", examples: "Contributions possibles avec processus de validation", weight: 3 },
            pluralite: { code: "Pl-El", name: "Profils élargis", desc: "Mais peu valorisés", type: "Commun", examples: "Participation de différents profils mais reconnaissance limitée", weight: 3 },
            autonomisation: { code: "Au-Ok", name: "Contribution possible", desc: "Sur invitation ou validation : Edition limitée à certains profils. Présence de workflow d'approbation. Début de documentation contributive. Usagers peu impliqués dans la gouvernance des contenus", type: "Commun", examples: "Edition collaborative avec validation, documentation communautaire", weight: 3 },
            pedagogique: { code: "Pé-Doc", name: "Usages pédagogiques", desc: "Partiellement décrits ou accompagnés", type: "REL", examples: "Documentation d'usage, exemples pédagogiques partiels", weight: 3 }
        }
    },
    "4": {
        label: "Ouverture semi-complète",
        description: "EduCommun de club avec infrastructure partagée, gouvernance collaborative et forte implication communautaire.",
        elements: {
            logiciel: { code: "Cs-Pm", name: "Licence Libre Permissive", desc: "Ex : MIT, Apache 2.0, BSD - Réutilisation libre sans réciprocité requise", type: "REL", examples: "MIT, Apache, BSD pour faciliter la réutilisation", weight: 4 },
            contenus: { code: "Co-Rc", name: "Licence Réciproque Standardisée", desc: "CC BY-SA avec identifiants DOI de versioning, possibilité de remix", type: "REL", examples: "CC BY-SA avec versioning, remix encouragé", weight: 4 },
            infrastructure: { code: "If-CoP", name: "Infrastructure Communs Publics", desc: "Ou associative Ex : Forge des communs numériques éducatifs basée sur logiciels libres, contributions ouvertes, portabilité, accès public à l'historique", type: "REL", examples: "Forges publiques, GitLab/GitHub institutionnel, historique accessible", weight: 4 },
            interoperabilite: { code: "In-IAP", name: "Interopérabilité par API", desc: "API documentées + métadonnées riches (LOM, schema.org)", type: "REL", examples: "APIs REST/GraphQL documentées, métadonnées LOM/schema.org", weight: 4 },
            processus: { code: "De-Col", name: "Gouvernance ouverte Collaborative", desc: "Ex : co-construction avec charte de gouvernance publique, rôles documentés, décisions partagées, comptes-rendus publics", type: "Commun", examples: "Chartes publiques, décisions collectives, transparence complète", weight: 4 },
            economique: { code: "EC-Mu", name: "Financement collectif", desc: "Avec infrastructure partagée, transparence financière", type: "Commun", examples: "Mutualisation des coûts, budget transparent, crowdfunding", weight: 4 },
            participation: { code: "Pa-Co", name: "Contributions possibles + structurées", desc: "Présence de workflow clair (pull requests, validation)", type: "Commun", examples: "Pull requests, code review, workflows GitFlow", weight: 4 },
            pluralite: { code: "Pl-Plu", name: "Implication plurielle", desc: "(enseignants, étudiants, techs), reconnaissance implicite", type: "Commun", examples: "Enseignants, étudiants, développeurs, reconnaissance des contributions", weight: 4 },
            autonomisation: { code: "Au-Act", name: "Capacitation active", desc: "Les usagers peuvent éditer, enrichir ou annoter. Présence de guides, d'espaces de discussion, de tutoriels, de reconnaissance symbolique. Début d'animation communautaire", type: "Commun", examples: "Outils d'édition, forums, tutoriels, badges, animation communautaire", weight: 4 },
            pedagogique: { code: "Pé-Int", name: "Intégration dans des séquences", desc: "Pratiques contextualisées", type: "REL", examples: "Scénarios pédagogiques, séquences complètes, contextualisation", weight: 4 }
        }
    },
    "5": {
        label: "Ouverture totale",
        description: "EduCommun ouvert avec infrastructure distribuée, gouvernance fédérée et capacitation systémique des utilisateurs.",
        elements: {
            logiciel: { code: "CS-Rc", name: "Licence Libre Réciproque", desc: "Ex : GPL, AGPL, CeCILL - Obligation de partager les modifications (copyleft)", type: "REL", examples: "GPL, AGPL pour garantir la réciprocité et l'ouverture", weight: 5 },
            contenus: { code: "Co-DO", name: "Licence Données Ouvertes", desc: "(CC BY-SA, domaine public, Etalab) avec compatibilité internationale, données liées (Linked Data)", type: "REL", examples: "CC BY-SA, domaine public, données liées RDF, compatibilité internationale", weight: 5 },
            infrastructure: { code: "If-DiS", name: "Infrastructure Distribuée Souveraine", desc: "Systèmes fédérés hébergés par acteurs publics ou citoyens, contrôle des données, interopérabilité native", type: "REL", examples: "Fediverse éducatif, P2P, blockchain éducative, contrôle citoyen", weight: 5 },
            interoperabilite: { code: "In-Sm", name: "Interopérabilité sémantique", desc: "Données liées Ex : NoDEfr, RDF, APIs ouvertes, moissonnage OAI-PMH", type: "REL", examples: "RDF/SPARQL, OAI-PMH, NoDEfr, interopérabilité sémantique complète", weight: 5 },
            processus: { code: "DE-Di", name: "Gouvernance distribuée", desc: "Modèle fédéré et transparent avec délégation dynamique Ex: holacratie", type: "Commun", examples: "Holacratie, gouvernance liquide, délégation dynamique, fédération", weight: 5 },
            economique: { code: "EC-Di", name: "Financement distribué", desc: "Reconnaissance des contributeurs, transparence financière", type: "Commun", examples: "Token economy, Universal Basic Income, reconnaissance économique des contributions", weight: 5 },
            participation: { code: "Pa-CoVa", name: "Contributions ouvertes valorisées", desc: "Encouragement explicite, reconnaissance des contributeurs", type: "Commun", examples: "Système de reconnaissance, incentives, valorisation des contributions", weight: 5 },
            pluralite: { code: "Pl-Div", name: "Diversité soutenue et structurée", desc: "Inclusion disciplinaire, culturelle, territoriale", type: "Commun", examples: "Inclusion active, diversité culturelle, multilinguisme, accessibilité", weight: 5 },
            autonomisation: { code: "Au-Sys", name: "Capacitation systémique", desc: "Contribution encouragée, structurée, outillée. Culture de la contribution cultivée. L'usager peut devenir auteur ou mainteneur. Littératie des communs numériques et compétences du 21ème siècle", type: "Commun", examples: "Formation aux communs, empowerment, transition usager->contributeur->mainteneur", weight: 5 },
            pedagogique: { code: "Pé-Co", name: "Ressources co-construites", desc: "Avec les enseignants, adaptables, scénarisables, alignées sur les besoins éducatifs", type: "REL", examples: "Co-création enseignants-étudiants, adaptation contextuelle, besoins terrain", weight: 5 }
        }
    }
};