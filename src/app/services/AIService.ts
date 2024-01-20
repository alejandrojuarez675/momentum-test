import { IClientAI } from "../ports/IClientAI";

export class AIService {

    constructor(
        private clientAI: IClientAI
    ) {}

    async askAQuestionBasedOnData(data: String, question: String, language: String): Promise<String> {
        return await this.clientAI.askAQuestionBasedOnData(data, question, language)
    }

    public async generateSalesCallTranscript(language: String): Promise<String> {
        return await this.clientAI.generateSalesCallTranscript(language)
    }

    public async summarizeData(data: String, language: String): Promise<String> {
        return await this.clientAI.summarizedData(data, language)
    }

    public async translate(data: String, from: String, to: String): Promise<String> {
        return await this.clientAI.translate(data, from, to)
    }
}