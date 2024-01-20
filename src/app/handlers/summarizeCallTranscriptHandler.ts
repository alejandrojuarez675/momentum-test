import { ReadFileUseCase } from "../usescases/readFileUseCase"
import { SummarizeDataUseCase } from "../usescases/summarizeDataUseCase"

export class SummarizeCallTranscriptsHandler {

    constructor(
        private summarizeCallTranscriptUsecase: SummarizeDataUseCase,
        private readFileUseCase: ReadFileUseCase,
    ) {}

    public async handle(dir: String, nameFile: String, language: String): Promise<String> {
        const data = await this.readFileUseCase.getContentFrom({
            dir,
            name: `${nameFile}.txt`
        })

        return await this.summarizeCallTranscriptUsecase.summarizeData(data, language)
    }

}