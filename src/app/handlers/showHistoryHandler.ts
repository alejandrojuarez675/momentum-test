import { QuestionAndAnswer } from "../../domain/questionAnswerDomain";
import { IDbService } from "../services/interfaces/IDbService";

export class ShowHistoryHandler {

    constructor(
        private dbService: IDbService,
    ) {}
    
    public async handle(fileName: String): Promise<QuestionAndAnswer[]> {
        return await this.dbService.showHistoryForFileName(fileName)
    }
}