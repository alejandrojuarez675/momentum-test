import { FileService } from "../services/fileService";

export class SaveFileUseCase {

    constructor(
        private fileService: FileService
    ) {}

    public save(data: {dir: String, name: String, data: String}) {
        return this.fileService.saveFile(data)
    }
}