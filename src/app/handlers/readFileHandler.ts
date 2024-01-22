import { FileService } from "../services/fileService";

export class ReadFileHandler {

    constructor(
        private fileService: FileService,
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