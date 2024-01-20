import { AIService } from "../services/AIService";

export class GenerateDataWithAIUseCase {

    constructor(
        private aiService: AIService
    ) {}
    
    public async generateSalesCallTranscript(): Promise<String> {
        return await this.aiService.generateSalesCallTranscript()
    }
}