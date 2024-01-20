import { AIService } from "../services/AIService";

export class TranslateDataUseCase {

    constructor(
        private aiService: AIService,
    ) {}

    public async translate(data: String, from: String, to: String) {
        return await this.aiService.translate(data, from, to)
    }

}