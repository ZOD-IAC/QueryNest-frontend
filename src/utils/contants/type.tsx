// ============================================
// FILE: types/profile.types.ts
// ============================================
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
  avatar: string;
  reputation: number;
  stats: {
    questions: number;
    answers: number;
    accepted: number;
  };
}

export interface Question {
  id: number;
  title: string;
  body: string;
  tags: string[];
  upvotes: number;
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
