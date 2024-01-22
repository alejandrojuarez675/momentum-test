import { promises as fs } from 'fs';
import { IFileService } from "../../src/app/services/interfaces/IFileService";

export class FileServiceMock implements IFileService {
    listFilesFromThatFolder(dir: String): Promise<String[]> {
        return Promise.resolve(['chat-example'])
    }
    async getContentFromFile(data: { dir: String; name: String; }): Promise<String> {
        return await fs.readFile('tests/mocks/chat-example.txt', { encoding: 'utf8' })
    }
    saveFile(data: { dir: String; name: String; data: String; }): void {
    }
}