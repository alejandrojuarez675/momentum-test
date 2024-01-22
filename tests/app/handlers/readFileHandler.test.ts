import { expect, jest, test } from '@jest/globals';
import { FileServiceMock } from '../../mocks/services/FilerServiceMock';
import { ReadFileHandler } from '../../../src/app/handlers/readFileHandler';
import { MOCKED_DIR_FILE, MOCKED_FILE_NAME, MOCKED_FILE_NAME_WITH_EXTENSION } from '../../mocks/constants';

describe('ReadFileHandler', () => {

    const mockedFileService = new FileServiceMock()
    const readFileHandler = new ReadFileHandler(mockedFileService)

    describe('handle', () => {

        test('have to return the content of specified file', async () => {
            expect(await readFileHandler.handle(MOCKED_DIR_FILE, MOCKED_FILE_NAME))
                .toBe(await mockedFileService.getContentFromFile({
                    dir: MOCKED_DIR_FILE, name: MOCKED_FILE_NAME_WITH_EXTENSION
                }))
        })

    })
})