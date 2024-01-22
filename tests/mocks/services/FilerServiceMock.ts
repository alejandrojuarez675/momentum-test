import { promises as fs } from 'fs';
import { IFileService } from "../../../src/app/services/interfaces/IFileService";
import { DIR_FILE, FILE_NAME_WITH_EXTENSION } from '../constants';

export class FileServiceMock implements IFileService {

    listFilesFromThatFolder(dir: String): Promise<String[]> {
        if (
            dir == DIR_FILE
        ) {
            return Promise.resolve(['chat-example'])
        } else {
            throw new Error("Mock option not implemented.");
        }
    }

    async getContentFromFile(data: { dir: String; name: String; }): Promise<String> {
        if (
            data.name == FILE_NAME_WITH_EXTENSION &&
            data.dir == DIR_FILE
        ) {
            return await fs.readFile('tests/mocks/chat-example.txt', { encoding: 'utf8' })
        } else {
            throw new Error("Mock option not implemented.");
        }
    }

    saveFile(data: { dir: String; name: String; data: String; }): void {
        if (data.dir != DIR_FILE || data.name != FILE_NAME_WITH_EXTENSION) {
            throw new Error("Mock option not implemented.");
        }
    }
}