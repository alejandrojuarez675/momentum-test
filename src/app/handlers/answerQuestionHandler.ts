import { AIService } from "../services/AIService"
import { DbService } from "../services/dbService"
import { FileService } from "../services/fileService"

export class AnswerQuestionsHandler {

    constructor(
        private aiService: AIService,
        private fileService: FileService,
        private dbService: DbService,
    ){}

    public async handle(dir: String, nameFile: String, question: String, language: String): Promise<String> {
        const data = await this.fileService.getContentFromFile({
            dir,
            name: `${nameFile}.txt`
        })

        const answer = await this.aiService.askAQuestionBasedOnData(data, question, language)

        await this.dbService.saveQuestionAndAnswerForFileName({question, answer}, nameFile)

        return answer
    }
}