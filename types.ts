
export enum AppState {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export interface SkincareRoutineStep {
  time: 'Morning' | 'Evening';
  action: string;
  description: string;
  productType: string;
}

export interface ProductRecommendation {
  category: string;
  ingredients: string[];
  why: string;
}

export interface YouTubeVideo {
  title: string;
  channel: string;
  searchQuery: string;
  description: string;
}

export interface SkinAnalysis {
  skinType: string;
  concerns: string[];
  hydratedLevel: number; // 0-100
  oilinessLevel: number; // 0-100
  sensitivityLevel: number; // 0-100
  summary: string;
  routine: SkincareRoutineStep[];
  products: ProductRecommendation[];
  videos: YouTubeVideo[];
}
