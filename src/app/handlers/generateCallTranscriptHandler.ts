import { FilenameCannotBeEmptyError } from "../errors/filenameCannotBeEmpty";
import { IAiService } from "../services/interfaces/IAiService";
import { IFileService } from "../services/interfaces/IFileService";
import { ILanguageService } from "../services/interfaces/ILanguageService";

export class GenerateCallTranscriptsHandler {

    constructor(
        private aiService: IAiService,
        private fileService: IFileService,
        private languageService: ILanguageService,
    ){}

    /**
    * @throws {InvalidLanguageError}
    * @throws {FilenameCannotBeEmptyError}
    */
    public async handle(dir: String, nameFile: String, language: String): Promise<String> {
        if (!nameFile) { throw new FilenameCannotBeEmptyError() }
        const validLanguage = this.languageService.validateLanguage(language)

        const generatedCall = await this.aiService.generateSalesCallTranscript(validLanguage);

        await this.fileService.saveFile({
            dir: dir,
            name: `${nameFile}.txt`,
            data: generatedCall
        });

        return generatedCall
    }
}