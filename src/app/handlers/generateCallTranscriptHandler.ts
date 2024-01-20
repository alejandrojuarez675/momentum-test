import { GenerateDataWithAIUseCase } from "../usescases/generateDataWithAIUseCase";
import { SaveFileUseCase } from "../usescases/saveFileUseCase";

export class GenerateCallTranscriptsHandler {

    constructor(
        private generateCallTranscriptsUseCase: GenerateDataWithAIUseCase,
        private saveFileUseCase: SaveFileUseCase,
    ){}

    public async handle(dir: String, nameFile: String): Promise<String> {
        const generatedCall = await this.generateCallTranscriptsUseCase.generateSalesCallTranscript();
       
        await this.saveFileUseCase.save({
            dir: dir,
            name: `${nameFile}.txt`,
            data: generatedCall
        });

        return generatedCall
    }
}