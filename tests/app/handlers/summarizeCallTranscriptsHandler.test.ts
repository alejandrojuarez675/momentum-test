import { expect, jest, test } from '@jest/globals';
import { AIServiceMock } from '../../mocks/services/AiServiceMock';
import { FileServiceMock } from '../../mocks/services/FilerServiceMock';
import { LanguageService } from '../../../src/app/services/languageService';
import { SummarizeCallTranscriptsHandler } from '../../../src/app/handlers/summarizeCallTranscriptHandler';
import { MOCKED_DIR_FILE, MOCKED_FILE_NAME, MOCKED_FILE_NAME_WITH_EXTENSION, MOCKED_NOT_ALLOWED_LANGUAGE } from '../../mocks/constants';
import { ValidLanguage } from '../../../src/domain/validLanguageSupport';
import { FilenameCannotBeEmptyError } from '../../../src/app/errors/filenameCannotBeEmpty';
import { InvalidLanguageError } from '../../../src/app/errors/invalidLanguageError';

describe('SummarizeCallTranscriptsHandler', () => {

    const mockedAiService = new AIServiceMock()
    const mockedFileService = new FileServiceMock()
    const languageService = new LanguageService()

    const summarizeCallTranscriptsHandler = new SummarizeCallTranscriptsHandler(
        mockedAiService, mockedFileService, languageService
    )

    describe('handle', () => {

        test('have to return a summarize using AI', async () => {
            expect(await summarizeCallTranscriptsHandler.handle(MOCKED_DIR_FILE, MOCKED_FILE_NAME, ValidLanguage.english))
                .toBe(await mockedAiService.summarizeData(
                    await mockedFileService.getContentFromFile({dir: MOCKED_DIR_FILE, name: MOCKED_FILE_NAME_WITH_EXTENSION}),
                    ValidLanguage.english
                ))
        })

        test('have to validate that filename cannot be empty', () => {
            expect(async () => await summarizeCallTranscriptsHandler.handle(MOCKED_DIR_FILE, '', ValidLanguage.english))
                .rejects
                .toThrow(FilenameCannotBeEmptyError)
        })

        test('have to read the transcription from a file', async () => {
            const originalTranscription = await mockedFileService.getContentFromFile({dir: MOCKED_DIR_FILE, name: MOCKED_FILE_NAME_WITH_EXTENSION})
            const spySaveFile = jest.spyOn(mockedFileService, 'getContentFromFile');

            expect(await summarizeCallTranscriptsHandler.handle(MOCKED_DIR_FILE, MOCKED_FILE_NAME, ValidLanguage.english))
                .toBe(await mockedAiService.summarizeData(
                    originalTranscription,
                    ValidLanguage.english
                ))

            expect(spySaveFile).toHaveBeenCalled()
        })

        test('have to validate that only allow valid languages', async () => {
            await expect(async () => 
                    await summarizeCallTranscriptsHandler.handle(MOCKED_DIR_FILE, MOCKED_FILE_NAME, MOCKED_NOT_ALLOWED_LANGUAGE))
                .rejects
                .toThrow(InvalidLanguageError)
        })
    })
})