export interface Mod {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  releaseDate: string;
  lastUpdated: string;
  categories: string[];
  tags: string[];
  compatibility: {
    fivemVersion: string;
    serverTypes: string[];
  };
  dependencies: string[];
  ratings: {
    userId: string;
    rating: number;
    review?: string;
    date: string;
  }[];
  downloads: number;
  previewImages: string[];
  previewVideos?: string[];
  fileSize: number;
}

export interface ModAnalytics {
  viewCount: number;
  averageViewTime: number;
  conversionRate: number;
  rating: number;
}
