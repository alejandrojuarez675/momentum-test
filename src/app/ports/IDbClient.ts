import { QuestionAndAnswer } from "../../domain/questionAnswerDomain";

export interface IDbClient {
  getHistoryByFileName(fileName: String): Promise<QuestionAndAnswer[]>;
  saveQuestionAndAnswerByFileName(questionAndAnswer: QuestionAndAnswer, fileName: String): Promise<void>;
}
