import { AIService } from "../services/AIService";
import { FileService } from "../services/fileService";

export class GenerateCallTranscriptsHandler {

    constructor(
        private aiService: AIService,
        private fileService: FileService,
    ){}

    public async handle(dir: String, nameFile: String, language: String): Promise<String> {
        const generatedCall = await this.aiService.generateSalesCallTranscript(language);

        await this.fileService.saveFile({
            dir: dir,
            name: `${nameFile}.txt`,
            data: generatedCall
        });

        return generatedCall
    }
}