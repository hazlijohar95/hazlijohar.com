
export interface Question {
  id: string;
  subject: string;
  message: string;
  status: 'pending' | 'answered' | 'closed';
  userId: string;
  createdAt: string;
  updatedAt: string;
  answer?: string | null;
  answeredAt?: string | null;
}

export type QuestionFormData = {
  subject: string;
  message: string;
};

export type QuestionStatus = 'pending' | 'answered' | 'closed';
