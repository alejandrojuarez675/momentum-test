import { QuestionAndAnswer } from "../../domain/questionAnswerDomain";

export interface DbClient {
  getHistoryByFileName(fileName: String): Promise<QuestionAndAnswer[]>;
  saveQuestionAndAnswerByFileName(questionAndAnswer: QuestionAndAnswer, fileName: String): Promise<void>;
}
