import { AIService } from "../services/AIService";

export class SummarizeDataUseCase {

    constructor(
        private aiService: AIService
    ) {}
    
    public summarizeData(data: String): String {
        return this.aiService.summarizeData(data)
    }
}