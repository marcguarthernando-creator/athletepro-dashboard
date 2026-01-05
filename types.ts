
export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  stats: {
    weight: string;
    vo2max: string;
    totalSessions: number;
    maxHr: number;
  };
}

export interface GroundingChunk {
  maps?: {
    uri: string;
    title: string;
  };
  web?: {
    uri: string;
    title: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  links?: GroundingChunk[];
}

export enum PerformanceStatus {
  OPTIMAL = 'Optimal',
  RECOVERING = 'Recovering',
  STRAINED = 'Strained',
  OVERTRAINED = 'Overtrained'
}
