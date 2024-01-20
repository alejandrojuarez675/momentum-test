var fs = require("fs");

export class FileService {
  public listFilesFromThatFolder(dir: String): String[] {
    return [];
  }

  public getContentFromFile(data: { dir: String; name: String }): String {
    return "";
  }

  public saveFile(data: { dir: String; name: String; data: String }) {
    fs.writeFile(
      data.dir.concat(data.name.toString()),
      data.data,
      function (err: any) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
  }
}
