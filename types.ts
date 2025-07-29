
export interface OptionType {
  text: string;
  feedback: string;
}

export type OptionKey = 'A' | 'B' | 'C' | 'D';

export interface QuestionType {
  question: string;
  options: {
    A: OptionType;
    B: OptionType;
    C: OptionType;
    D: OptionType;
  };
  correctAnswer: OptionKey;
}
