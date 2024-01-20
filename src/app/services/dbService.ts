import { QuestionAndAnswer } from "../../domain/questionAnswerDomain";
import { DbClient } from "../ports/dbClient";

export class DbService {

    constructor(
        private dbClient: DbClient,
    ) {}

    async showHistoryForFileName(fileName: String): Promise<QuestionAndAnswer[]> {
        return await this.dbClient.getHistoryByFileName(fileName)
    }

    async saveQuestionAndAnswerForFileName(questionAndAnswer: QuestionAndAnswer, fileName: String): Promise<void> {
        return await this.dbClient.saveQuestionAndAnswerByFileName(questionAndAnswer, fileName)
    }
}