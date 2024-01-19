import { IClientAI } from "../../app/ports/IClientAI";

export class OpenAIClient implements IClientAI {

    askAQuestionBasedOnData(data: String, question: String): String {
        throw new Error("Method not implemented.");
    }

    summarizedData(data: String): String {
        throw new Error("Method not implemented.");
    }

    generateSalesCallTranscript(): String {
        throw new Error("Method not implemented.");
    }

}