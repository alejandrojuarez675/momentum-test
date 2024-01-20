import { ListFilesUseCase } from "../usescases/listFilesUseCase";

export class ListFilesHandler {

    constructor(
        private listFileUseCase: ListFilesUseCase,
    ){}

    public async handle(dir: String) {
        return await this.listFileUseCase.listFilesFrom(dir)
    }
}