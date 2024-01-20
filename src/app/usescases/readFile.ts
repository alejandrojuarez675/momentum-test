import { FileService } from "../services/fileService";

export class ReadFileUseCase {

    constructor(
        private fileService: FileService
    ) {}
    
    public async getContentFrom(data: {dir: String, name: String}): Promise<String> {
        return await this.fileService.getContentFromFile(data)
    }
}