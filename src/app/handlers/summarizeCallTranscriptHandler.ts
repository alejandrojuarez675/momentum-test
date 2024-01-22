import { FilenameCannotBeEmptyError } from "../errors/filenameCannotBeEmpty"
import { IAiService } from "../services/interfaces/IAiService"
import { IFileService } from "../services/interfaces/IFileService"
import { ILanguageService } from "../services/interfaces/ILanguageService"

export class SummarizeCallTranscriptsHandler {

    constructor(
        private aiService: IAiService,
        private fileService: IFileService,
        private languageService: ILanguageService,
    ) {}

    /**
    * @throws {InvalidLanguageError}
    */
    public async handle(dir: String, nameFile: String, language: String): Promise<String> {
        if (!nameFile) { throw new FilenameCannotBeEmptyError() }
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