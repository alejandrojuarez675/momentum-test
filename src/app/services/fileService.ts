import { promises as fs } from 'fs';

export class FileService {

  public async listFilesFromThatFolder(dir: String): Promise<String[]> {
    let result = []
    result = await fs.readdir(dir.toString());
    return result;
  }

  public getContentFromFile(data: { dir: String; name: String }): String {
    return "";
  }

  public async saveFile(data: { dir: String; name: String; data: String }) {
    await fs.writeFile(
      data.dir.concat(data.name.toString()),
      data.data
    );
    console.log(`saved on ${data.dir}${data.name}`)
  }
}
