jest.mock('fs', () => ({
    promises: {
        readdir: jest.fn().mockReturnValue(Promise.resolve(['file1', 'file2'])),
        readFile: jest.fn().mockReturnValue(Promise.resolve('content')),

    }
}))

import { FileService } from "../../../src/app/services/fileService"
import { MOCKED_DIR_FILE, MOCKED_FILE_NAME } from "../../mocks/constants"

describe('FileService', () => {

    const fileService = new FileService()

    describe('listFilesFromThatFolder', () => {
        test('have to return a list with the files of this folder', async () => {
            expect(
                await fileService.listFilesFromThatFolder(MOCKED_DIR_FILE)
            ).toEqual(
                ['file1', 'file2']
            )
        })
    })

    describe('getContentFromFile', () => {
        test('have to return the content os this files', async () => {
            expect(
                await fileService.getContentFromFile({dir: MOCKED_DIR_FILE, name: MOCKED_FILE_NAME})
            ).toEqual(
                'content'
            )
        })
    })

})