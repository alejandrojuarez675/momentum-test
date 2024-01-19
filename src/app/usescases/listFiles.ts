import { FileService } from "../services/fileService";

export class ListFilesUseCase {

    constructor(
        private fileService: FileService
    ) {}
    
    public listFilesFrom(dir: String): String[] {
        return this.fileService.listFilesFromThatFolder(dir)
    }
}