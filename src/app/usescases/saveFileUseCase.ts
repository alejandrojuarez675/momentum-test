import { FileService } from "../services/fileService";

export class SaveFileUseCase {

    constructor(
        private fileService: FileService
    ) {}

    public async save(data: {dir: String, name: String, data: String}) {
        await this.fileService.saveFile(data)
    }
}