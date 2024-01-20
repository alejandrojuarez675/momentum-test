import { QuestionAndAnswer } from "../../domain/questionAnswerDomain";
import { DbService } from "../services/dbService";

export class ShowHistoryHandler {

    constructor(
        private dbService: DbService,
    ) {}
    
    public async handle(fileName: String): Promise<QuestionAndAnswer[]> {
        return await this.dbService.showHistoryForFileName(fileName)
    }
}