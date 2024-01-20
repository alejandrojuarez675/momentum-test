import { FileService } from "../services/fileService";

export class ListFilesHandler {

    constructor(
        private fileService: FileService,    
    ){}

    public async handle(dir: String) {
        return await this.fileService.listFilesFromThatFolder(dir)
    }
}