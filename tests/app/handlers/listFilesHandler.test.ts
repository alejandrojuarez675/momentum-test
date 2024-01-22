import { expect, test } from '@jest/globals';
import { ListFilesHandler } from '../../../src/app/handlers/listFilesHandler';
import { FileServiceMock } from '../../mocks/FilerServiceMock';
import { DIR_FILE } from '../../mocks/constants';

describe('ListFilesHandler', () => {

    const mockedFileService = new FileServiceMock()
    const listFilesHandler = new ListFilesHandler(mockedFileService)

    describe('handle', () => {

        test('have to return list of files on the specified folder', async () => {
            expect(await listFilesHandler.handle(DIR_FILE))
                .toEqual(await mockedFileService.listFilesFromThatFolder(DIR_FILE))
        })

    })
})