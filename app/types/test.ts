export type Answer = {
  text: string;
  correct: boolean;
};

export type Question = {
  text: string;
  type: string;
  image: string;
  answers: Answer[];
};

export type Questionaire = {
  time: number;
  questionaire_name: string;
  questions: Question[];
  maxQuestions: number;
};

export type QuestionaireData = Questionaire & {
  filename: string;
  questionsAmount: number;
};
