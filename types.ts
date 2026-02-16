
export enum AppView {
  LANDING = 'landing',
  DASHBOARD = 'dashboard',
  MIND_MAP = 'mind_map',
  OUTLINE = 'outline',
  AUTH = 'auth'
}

export interface ResearchNode {
  id: string;
  label: string;
  description?: string;
  type: 'core' | 'supporting' | 'source';
  children?: ResearchNode[];
}

export interface ResearchOutline {
  title: string;
  sections: {
    heading: string;
    subheadings: string[];
    context: string;
  }[];
}

export interface MindMapData {
  nodes: ResearchNode[];
}
