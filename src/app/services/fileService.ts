import { promises as fs } from 'fs';
import { FileNotFoundError } from '../errors/fileNotFoundError';

export class FileService {

  public async listFilesFromThatFolder(dir: String): Promise<String[]> {
    let result = []
    result = await fs.readdir(dir.toString());
    return result;
  }

  /**
   * @throws {FileNotFoundError}
   */
  public async getContentFromFile(data: { dir: String; name: String }): Promise<String> {
    try {
      return await fs.readFile(data.dir.concat(data.name.toString()), { encoding: 'utf8' })
    } catch (error) {
      throw new FileNotFoundError()
    }
  }

  public async saveFile(data: { dir: String; name: String; data: String }) {
    await fs.writeFile(
      data.dir.concat(data.name.toString()),
      data.data
    );
    console.debug(`saved on ${data.dir}${data.name}`)
  }
}
