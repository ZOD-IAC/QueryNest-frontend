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
  createdAt: Date;
  stats: {
    questions: number;
    answers: number;
    accepted: number;
  };
  questions : Question[];
}

export interface Question {
  _id: number;
  title: string;
  body: string;
  tags: Tag[];
  upvotes: string[];
  answers: string[];
  views: number;
  createdAt: string;
  isAnswered: boolean;
  answersCount: number;
}

export interface Tag {
  _id : string , 
  tagName : string
}

export interface Answer {
  id: number;
  questionId: number;
  questionTitle: string;
  body: string;
  votes: number;
  isAccepted: boolean;
  createdAt: string;
  // question : Question[]
  userVote?: 'up' | 'down' | null;
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

export interface formData {
  password: string;
  email: string;
}

export interface AnswersTabProps {
  answers: Answer[];
}