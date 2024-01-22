jest.mock('../../../src/app/services/AIService')
jest.mock('../../../src/app/services/FileService')
jest.mock('../../../src/app/services/LanguageService')

import { expect, jest, test } from '@jest/globals';
import { InvalidLanguageError } from '../../../src/app/errors/invalidLanguageError';
import { GenerateCallTranscriptsHandler } from '../../../src/app/handlers/generateCallTranscriptHandler';
import { FileService } from '../../../src/app/services/fileService';
import { LanguageService } from '../../../src/app/services/languageService';
import { AIServiceMock } from '../../mocks/AiServiceMock';
import { DIR_FILE, FILE_NAME, NOT_ALLOWED_LANGUAGE } from '../../mocks/constants';
import { ValidLanguage } from '../../../src/domain/validLanguageSupport';
import { FilenameCannotBeEmptyError } from '../../../src/app/errors/filenameCannotBeEmpty';
import { FileServiceMock } from '../../mocks/FilerServiceMock';

describe('GenerateCallTranscriptsHandler', () => {

    const mockedAiService = new AIServiceMock()
    const mockedFileService = new FileServiceMock()
    const languageService = new LanguageService()

    const generateCallTranscriptHandler = new GenerateCallTranscriptsHandler(
        mockedAiService, mockedFileService, languageService)

    describe('handle', () => {

        test('have to return the generated call', async () => {
            expect(await generateCallTranscriptHandler.handle(DIR_FILE, FILE_NAME, ValidLanguage.english))
                .toBe(await mockedAiService.generateSalesCallTranscript(ValidLanguage.english))
        })

        test('filename cannot be empty', () => {
            expect(async () => await generateCallTranscriptHandler.handle(DIR_FILE, '', ValidLanguage.english))
                .rejects
                .toThrow(FilenameCannotBeEmptyError)
        })

        // TODO fix
        // test('only allow valid languages', async () => {
        //     await expect(async () => 
        //             await generateCallTranscriptHandler.handle(DIR_FILE, FILE_NAME, NOT_ALLOWED_LANGUAGE))
        //         .rejects
        //         .toThrow(InvalidLanguageError)
        // })
    })

})