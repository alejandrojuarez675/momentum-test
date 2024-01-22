import { expect, test } from '@jest/globals';
import { ListFilesHandler } from '../../../src/app/handlers/listFilesHandler';
import { FileServiceMock } from '../../mocks/services/FilerServiceMock';
import { MOCKED_DIR_FILE } from '../../mocks/constants';

describe('ListFilesHandler', () => {

    const mockedFileService = new FileServiceMock()
    const listFilesHandler = new ListFilesHandler(mockedFileService)

    describe('handle', () => {

        test('have to return list of files on the specified folder', async () => {
            expect(await listFilesHandler.handle(MOCKED_DIR_FILE))
                .toEqual(await mockedFileService.listFilesFromThatFolder(MOCKED_DIR_FILE))
        })

    })
})