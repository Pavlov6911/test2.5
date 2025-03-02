export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  downloadHistory: string[];
  preferences: {
    categories: string[];
    tags: string[];
    gameStyle: string[];
    fivemVersion: string;
    serverAffiliations?: string[];
    theme: 'light' | 'dark';
  };
  ratings: {
    modId: string;
    rating: number;
    review?: string;
    date: string;
  }[];
  activity: {
    lastLogin: string;
    totalDownloads: number;
    totalReviews: number;
    reputation: number;
  };
  wishlist: string[];
  privacySettings: {
    profileVisibility: 'public' | 'private' | 'friends';
    showDownloadHistory: boolean;
    showServerAffiliations: boolean;
  };
}

export interface UserAnalytics {
  searchHistory: {
    term: string;
    timestamp: string;
  }[];
  categoryInteractions: {
    [category: string]: number;
  };
  modViewTime: {
    modId: string;
    totalTime: number;
    lastViewed: string;
  }[];
}
