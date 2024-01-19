import { IClientAI } from "../ports/IClientAI";

export class AIService {

    constructor(
        private clientAI: IClientAI
    ) {}

    askAQuestionBasedOnData(data: String, question: String): String {
        return this.clientAI.askAQuestionBasedOnData(data, question)
    }

    public generateSalesCallTranscript(): String {
        return this.clientAI.generateSalesCallTranscript()
    }

    public summarizeData(data: String): String {
        return this.clientAI.summarizedData(data)
    }
}