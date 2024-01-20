import { GenerateDataWithAIUseCase } from "../usescases/generateDataWithAIUseCase";
import { SaveFileUseCase } from "../usescases/saveFileUseCase";
import { TranslateDataUseCase } from "../usescases/translateDataUseCase";

export class GenerateCallTranscriptsHandler {

    constructor(
        private generateCallTranscriptsUseCase: GenerateDataWithAIUseCase,
        private saveFileUseCase: SaveFileUseCase,
        private translateDataUseCase: TranslateDataUseCase,
    ){}

    public async handle(dir: String, nameFile: String, language: String): Promise<String> {
        const generatedCall = await this.generateCallTranscriptsUseCase.generateSalesCallTranscript();

        const translatedCall = 'english' != language.toLowerCase() ?
            await this.translateDataUseCase.translate(generatedCall, 'english', language) :
            generatedCall

        await this.saveFileUseCase.save({
            dir: dir,
            name: `${nameFile}.txt`,
            data: translatedCall
        });

        return translatedCall
    }
}