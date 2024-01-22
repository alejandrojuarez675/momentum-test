import { expect, jest, test } from '@jest/globals';
import { FilenameCannotBeEmptyError } from '../../../src/app/errors/filenameCannotBeEmpty';
import { GenerateCallTranscriptsHandler } from '../../../src/app/handlers/generateCallTranscriptHandler';
import { LanguageService } from '../../../src/app/services/languageService';
import { ValidLanguage } from '../../../src/domain/validLanguageSupport';
import { AIServiceMock } from '../../mocks/AiServiceMock';
import { FileServiceMock } from '../../mocks/FilerServiceMock';
import { DIR_FILE, FILE_NAME, MOCKED_VALID_LANGUAGE } from '../../mocks/constants';

describe('GenerateCallTranscriptsHandler', () => {

    const mockedAiService = new AIServiceMock()
    const mockedFileService = new FileServiceMock()
    const languageService = new LanguageService()

    const generateCallTranscriptHandler = new GenerateCallTranscriptsHandler(
        mockedAiService, mockedFileService, languageService)

    describe('handle', () => {

        test('have to return the generated call transcription using AI', async () => {
            expect(await generateCallTranscriptHandler.handle(DIR_FILE, FILE_NAME, MOCKED_VALID_LANGUAGE))
                .toBe(await mockedAiService.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE))
        })

        test('have to validate that filename cannot be empty', () => {
            expect(async () => await generateCallTranscriptHandler.handle(DIR_FILE, '', MOCKED_VALID_LANGUAGE))
                .rejects
                .toThrow(FilenameCannotBeEmptyError)
        })

        // TODO fix
        // test('have to validate that only allow valid languages', async () => {
        //     await expect(async () => 
        //             await generateCallTranscriptHandler.handle(DIR_FILE, FILE_NAME, NOT_ALLOWED_LANGUAGE))
        //         .rejects
        //         .toThrow(InvalidLanguageError)
        // })

        test('have to save the transcription on a file', async () => {
            const spySaveFile = jest.spyOn(mockedFileService, 'saveFile');

            expect(await generateCallTranscriptHandler.handle(DIR_FILE, FILE_NAME, MOCKED_VALID_LANGUAGE))
                .toBe(await mockedAiService.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE))

            expect(spySaveFile).toHaveBeenCalled()

        })
    })

})