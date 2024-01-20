import { promises as fs } from 'fs';

export class FileService {

  public async listFilesFromThatFolder(dir: String): Promise<String[]> {
    let result = []
    result = await fs.readdir(dir.toString());
    return result;
  }

  public async getContentFromFile(data: { dir: String; name: String }): Promise<String> {
    return await fs.readFile(data.dir.concat(data.name.toString()), { encoding: 'utf8' })
  }

  public async saveFile(data: { dir: String; name: String; data: String }) {
    await fs.writeFile(
      data.dir.concat(data.name.toString()),
      data.data
    );
    console.debug(`saved on ${data.dir}${data.name}`)
  }
}
