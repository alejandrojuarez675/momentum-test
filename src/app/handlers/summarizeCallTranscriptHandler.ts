import { AIService } from "../services/AIService"
import { FileService } from "../services/fileService"

export class SummarizeCallTranscriptsHandler {

    constructor(
        private aiService: AIService,
        private fileService: FileService,
    ) {}

    public async handle(dir: String, nameFile: String, language: String): Promise<String> {
        const data = await this.fileService.getContentFromFile({
            dir,
            name: `${nameFile}.txt`
        })

        return await this.aiService.summarizeData(data, language)
    }

}