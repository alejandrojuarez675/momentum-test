import { AIService } from "../services/AIService";

export class GenerateDataWithAIUseCase {

    constructor(
        private aiService: AIService
    ) {}
    
    public generateSalesCallTranscript(): String {
        return this.aiService.generateSalesCallTranscript()
    }
}