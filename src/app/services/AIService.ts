import { ValidLanguage } from "../../domain/validLanguageSupport";
import { IClientAI } from "../ports/IClientAI";

export class AIService {

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

    public async translate(data: String, from: ValidLanguage, to: ValidLanguage): Promise<String> {
        return await this.clientAI.translate(data, from, to)
    }
}