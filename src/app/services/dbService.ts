import { QuestionAndAnswer } from "../../domain/questionAnswerDomain";
import { IDbClient } from "../ports/IDbClient";

export class DbService {

    constructor(
        private dbClient: IDbClient,
    ) {}

    async showHistoryForFileName(fileName: String): Promise<QuestionAndAnswer[]> {
        return await this.dbClient.getHistoryByFileName(fileName)
    }

    async saveQuestionAndAnswerForFileName(questionAndAnswer: QuestionAndAnswer, fileName: String): Promise<void> {
        return await this.dbClient.saveQuestionAndAnswerByFileName(questionAndAnswer, fileName)
    }
}