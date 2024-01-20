import { AIService } from "../services/AIService";

export class SummarizeDataUseCase {

    constructor(
        private aiService: AIService
    ) {}
    
    public async summarizeData(data: String): Promise<String> {
        return await this.aiService.summarizeData(data)
    }
}