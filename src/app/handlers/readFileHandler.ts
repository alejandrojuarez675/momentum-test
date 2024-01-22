import { IFileService } from "../services/interfaces/IFileService";

export class ReadFileHandler {

    constructor(
        private fileService: IFileService,
    ) {}
    /**
    * @throws {FileNotFoundError}
    */
    public async handle(dir: String, nameFile: String): Promise<String> {
        return await this.fileService.getContentFromFile({
            dir,
            name: `${nameFile}.txt`
        })
    }

}