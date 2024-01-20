import { AIService } from "../services/AIService";

export class AnswerQuestionsUseCase {
    constructor(
        private aiService: AIService
    ) {}
    
    public async askAQuestionInThatData(data: String, question: String, language: String): Promise<String> {
        return await this.aiService.askAQuestionBasedOnData(data, question, language)
    }
}