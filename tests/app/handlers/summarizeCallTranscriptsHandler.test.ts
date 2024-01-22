import { expect, jest, test } from '@jest/globals';
import { AIServiceMock } from '../../mocks/AiServiceMock';
import { FileServiceMock } from '../../mocks/FilerServiceMock';
import { LanguageService } from '../../../src/app/services/languageService';
import { SummarizeCallTranscriptsHandler } from '../../../src/app/handlers/summarizeCallTranscriptHandler';
import { DIR_FILE, FILE_NAME, FILE_NAME_WITH_EXTENSION } from '../../mocks/constants';
import { ValidLanguage } from '../../../src/domain/validLanguageSupport';
import { FilenameCannotBeEmptyError } from '../../../src/app/errors/filenameCannotBeEmpty';

describe('SummarizeCallTranscriptsHandler', () => {

    const mockedAiService = new AIServiceMock()
    const mockedFileService = new FileServiceMock()
    const languageService = new LanguageService()

    const summarizeCallTranscriptsHandler = new SummarizeCallTranscriptsHandler(
        mockedAiService, mockedFileService, languageService
    )

    describe('handle', () => {

        test('have to return a summarize using AI', async () => {
            expect(await summarizeCallTranscriptsHandler.handle(DIR_FILE, FILE_NAME, ValidLanguage.english))
                .toBe(await mockedAiService.summarizeData(
                    await mockedFileService.getContentFromFile({dir: DIR_FILE, name: FILE_NAME_WITH_EXTENSION}),
                    ValidLanguage.english
                ))
        })

        test('have to validate that filename cannot be empty', () => {
            expect(async () => await summarizeCallTranscriptsHandler.handle(DIR_FILE, '', ValidLanguage.english))
                .rejects
                .toThrow(FilenameCannotBeEmptyError)
        })

        test('have to read the transcription from a file', async () => {
            const originalTranscription = await mockedFileService.getContentFromFile({dir: DIR_FILE, name: FILE_NAME_WITH_EXTENSION})
            const spySaveFile = jest.spyOn(mockedFileService, 'getContentFromFile');

            expect(await summarizeCallTranscriptsHandler.handle(DIR_FILE, FILE_NAME, ValidLanguage.english))
                .toBe(await mockedAiService.summarizeData(
                    originalTranscription,
                    ValidLanguage.english
                ))

            expect(spySaveFile).toHaveBeenCalled()
        })

        // TODO fix
        // test('have to validate that only allow valid languages', async () => {
        // })
    })
})