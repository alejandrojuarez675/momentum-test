import { AIService } from "../services/AIService"
import { DbService } from "../services/dbService"
import { FileService } from "../services/fileService"
import { LanguageService } from "../services/languageService"

export class AnswerQuestionsHandler {

    constructor(
        private aiService: AIService,
        private fileService: FileService,
        private dbService: DbService,
        private languageService: LanguageService,
    ){}

    /**
    * @throws {InvalidLanguageError}
    * @throws {FileNotFoundError}
    */
    public async handle(dir: String, nameFile: String, question: String, language: String): Promise<String> {
        const validLanguage = this.languageService.validateLanguage(language)
        
        const data = await this.fileService.getContentFromFile({
            dir,
            name: `${nameFile}.txt`
        })

        const answer = await this.aiService.askAQuestionBasedOnData(data, question, validLanguage)

        await this.dbService.saveQuestionAndAnswerForFileName({question, answer}, nameFile)

        return answer
    }
}