export interface IFileService {
    listFilesFromThatFolder(dir: String): Promise<String[]>
    getContentFromFile(data: { dir: String; name: String }): Promise<String>
    saveFile(data: { dir: String; name: String; data: String }): void
}