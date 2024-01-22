import { ValidLanguage } from "../../domain/validLanguageSupport";
import { IClientAI } from "../ports/IClientAI";
import { IAiService } from "./interfaces/IAiService";

export class AIService implements IAiService {

    constructor(
        private clientAI: IClientAI
    ) {}

    async askAQuestionBasedOnData(data: String, question: String, language: ValidLanguage): Promise<String> {
        return await this.clientAI.askAQuestionBasedOnData(data, question, language)
    }

    public async generateSalesCallTranscript(language: ValidLanguage): Promise<String> {
        return await this.clientAI.generateSalesCallTranscript(language)
    }

    public async summarizeData(data: String, language: ValidLanguage): Promise<String> {
        return await this.clientAI.summarizedData(data, language)
    }

}