import { QuestionAndAnswer } from "../../../domain/questionAnswerDomain"

export interface IDbService {
    showHistoryForFileName(fileName: String): Promise<QuestionAndAnswer[]>
    saveQuestionAndAnswerForFileName(questionAndAnswer: QuestionAndAnswer, fileName: String): Promise<void>
}