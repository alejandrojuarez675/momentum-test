import { FileService } from "../services/fileService";

export class ReadFileUseCase {

    constructor(
        private fileService: FileService
    ) {}
    
    public getContentFrom(data: {dir: String, name: String}): String {
        return this.fileService.getContentFromFile(data)
    }
}