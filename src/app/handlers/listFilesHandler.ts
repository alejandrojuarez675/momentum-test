import { IFileService } from "../services/interfaces/IFileService";

export class ListFilesHandler {

    constructor(
        private fileService: IFileService,    
    ){}

    public async handle(dir: String) {
        return await this.fileService.listFilesFromThatFolder(dir)
    }
}