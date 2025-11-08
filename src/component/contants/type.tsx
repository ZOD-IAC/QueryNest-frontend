// ============================================
// FILE: types/profile.types.ts
// ============================================
export interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
  avatar: string;
  reputation: number;
  badges: {
    gold: number;
    silver: number;
    bronze: number;
  };
  stats: {
    questions: number;
    answers: number;
    accepted: number;
    reached: number;
  };
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}


export interface Question {
  id: number;
  title: string;
  content: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
  isAnswered: boolean;
}

export interface Answer {
  id: number;
  questionId: number;
  questionTitle: string;
  content: string;
  votes: number;
  isAccepted: boolean;
  createdAt: string;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  type: 'gold' | 'silver' | 'bronze';
  earnedDate: string;
  icon: string;
}

export type TabType =
  | 'profile'
  | 'questions'
  | 'answers'
  | 'badges'
  | 'activity'
  | 'saved'
  | 'ask';
