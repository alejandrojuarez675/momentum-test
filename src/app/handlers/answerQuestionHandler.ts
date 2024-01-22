import { FilenameCannotBeEmptyError } from "../errors/filenameCannotBeEmpty"
import { QuestionCannotBeEmptyError } from "../errors/questionCannotBeEmpty"
import { IAiService } from "../services/interfaces/IAiService"
import { IDbService } from "../services/interfaces/IDbService"
import { IFileService } from "../services/interfaces/IFileService"
import { ILanguageService } from "../services/interfaces/ILanguageService"

export class AnswerQuestionsHandler {

    constructor(
        private aiService: IAiService,
        private fileService: IFileService,
        private dbService: IDbService,
        private languageService: ILanguageService,
    ){}

    /**
    * @throws {InvalidLanguageError}
    * @throws {FileNotFoundError}
    * @throws {QuestionCannotBeEmptyError}
    */
    public async handle(dir: String, nameFile: String, question: String, language: String): Promise<String> {
        if (!nameFile) { throw new FilenameCannotBeEmptyError() }
        if (!question) { throw new QuestionCannotBeEmptyError() }
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