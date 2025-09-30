
export interface ElementData {
  code: string;
  name: string;
  desc: string;
  type: 'REL' | 'Commun';
  examples: string;
  weight: number;
}

export type Dimension = 
  | 'logiciel' 
  | 'contenus' 
  | 'infrastructure' 
  | 'interoperabilite' 
  | 'processus' 
  | 'economique' 
  | 'participation' 
  | 'pluralite' 
  | 'autonomisation' 
  | 'pedagogique';

export interface LevelData {
  label: string;
  description: string;
  elements: Record<Dimension, ElementData>;
}

export type TableData = Record<string, LevelData>;

export type SelectedElements = Partial<Record<Dimension, number>>;

export interface TooltipData {
  visible: boolean;
  content: {
    name: string;
    code: string;
    type: string;
    desc: string;
    examples: string;
  } | null;
  x: number;
  y: number;
}
