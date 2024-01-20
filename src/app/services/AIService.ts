import { IClientAI } from "../ports/IClientAI";

export class AIService {

    constructor(
        private clientAI: IClientAI
    ) {}

    async askAQuestionBasedOnData(data: String, question: String): Promise<String> {
        return await this.clientAI.askAQuestionBasedOnData(data, question)
    }

    public async generateSalesCallTranscript(): Promise<String> {
        return await this.clientAI.generateSalesCallTranscript()
    }

    public async summarizeData(data: String): Promise<String> {
        return await this.clientAI.summarizedData(data)
    }
}