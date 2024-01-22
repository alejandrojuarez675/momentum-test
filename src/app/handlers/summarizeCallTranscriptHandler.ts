import { AIService } from "../services/AIService"
import { FileService } from "../services/fileService"
import { LanguageService } from "../services/languageService"

export class SummarizeCallTranscriptsHandler {

    constructor(
        private aiService: AIService,
        private fileService: FileService,
        private languageService: LanguageService,
    ) {}

    /**
    * @throws {InvalidLanguageError}
    */
    public async handle(dir: String, nameFile: String, language: String): Promise<String> {
        const validLanguage = this.languageService.validateLanguage(language)
        
        /**
        * @throws {FileNotFoundError}
        */
        const data = await this.fileService.getContentFromFile({
            dir,
            name: `${nameFile}.txt`
        })

        return await this.aiService.summarizeData(data, validLanguage)
    }

}