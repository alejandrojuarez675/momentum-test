import { AIService } from "../services/AIService"
import { FileService } from "../services/fileService"

export class AnswerQuestionsHandler {

    constructor(
        private aiService: AIService,
        private fileService: FileService,
    ){}

    public async handle(dir: String, nameFile: String, question: String, language: String): Promise<String> {
        const data = await this.fileService.getContentFromFile({
            dir,
            name: `${nameFile}.txt`
        })

        return await this.aiService.askAQuestionBasedOnData(data, question, language)
    }
}