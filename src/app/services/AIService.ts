import { IClientAI } from "../ports/IClientAI";

export class AIService {

    constructor(
        private clientAI: IClientAI
    ) {}

    askAQuestionBasedOnData(data: String, question: String): String {
        return this.clientAI.askAQuestionBasedOnData(data, question)
    }

    public async generateSalesCallTranscript(): Promise<String> {
        return await this.clientAI.generateSalesCallTranscript()
    }

    public summarizeData(data: String): String {
        return this.clientAI.summarizedData(data)
    }
}