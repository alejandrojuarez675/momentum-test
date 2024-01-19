import { AIService } from "../services/AIService";

export class AnswerQuestionsUseCase {
    constructor(
        private aiService: AIService
    ) {}
    
    public askAQuestionInThatData(data: String, question: String): String {
        return this.aiService.askAQuestionBasedOnData(data, question)
    }
}