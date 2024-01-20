import { ReadFileUseCase } from "../usescases/readFileUseCase";

export class ReadFileHandler {

    constructor(
        private readFileUseCase: ReadFileUseCase
    ) {}

    public async handle(dir: String, nameFile: String): Promise<String> {
        return await this.readFileUseCase.getContentFrom({
            dir,
            name: `${nameFile}.txt`
        })
    }

}