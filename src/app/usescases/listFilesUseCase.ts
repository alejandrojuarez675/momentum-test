import { FileService } from "../services/fileService";

export class ListFilesUseCase {

    constructor(
        private fileService: FileService
    ) {}
    
    public async listFilesFrom(dir: String): Promise<String[]> {
        return await this.fileService.listFilesFromThatFolder(dir)
    }
}