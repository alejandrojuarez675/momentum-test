jest.mock('fs', () => ({
    promises: {
        readdir: jest.fn().mockReturnValue(Promise.resolve(['file1', 'file2'])),
        readFile: jest.fn().mockReturnValue(Promise.resolve('content')),

    }
}))

import { FileService } from "../../../src/app/services/fileService"
import { DIR_FILE, FILE_NAME } from "../../mocks/constants"

describe('FileService', () => {

    const fileService = new FileService()

    describe('listFilesFromThatFolder', () => {
        test('have to return a list with the files of this folder', async () => {
            expect(
                await fileService.listFilesFromThatFolder(DIR_FILE)
            ).toEqual(
                ['file1', 'file2']
            )
        })
    })

    describe('getContentFromFile', () => {
        test('have to return the content os this files', async () => {
            expect(
                await fileService.getContentFromFile({dir: DIR_FILE, name: FILE_NAME})
            ).toEqual(
                'content'
            )
        })
    })

})