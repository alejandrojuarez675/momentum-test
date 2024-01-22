import { AIService } from "../services/AIService";
import { FileService } from "../services/fileService";
import { LanguageService } from "../services/languageService";

export class GenerateCallTranscriptsHandler {

    constructor(
        private aiService: AIService,
        private fileService: FileService,
        private languageService: LanguageService,
    ){}

    /**
    * @throws {InvalidLanguageError}
    */
    public async handle(dir: String, nameFile: String, language: String): Promise<String> {
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