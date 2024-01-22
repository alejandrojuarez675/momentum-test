import { expect, jest, test } from '@jest/globals';
import { FilenameCannotBeEmptyError } from '../../../src/app/errors/filenameCannotBeEmpty';
import { AnswerQuestionsHandler } from '../../../src/app/handlers/answerQuestionHandler';
import { LanguageService } from '../../../src/app/services/languageService';
import { AIServiceMock } from '../../mocks/services/AiServiceMock';
import { DbServiceMock } from '../../mocks/services/DbServiceMock';
import { FileServiceMock } from '../../mocks/services/FilerServiceMock';
import { DIR_FILE, FILE_NAME, MOCKED_QUESTION, MOCKED_VALID_LANGUAGE, NOT_ALLOWED_LANGUAGE } from '../../mocks/constants';
import { QuestionCannotBeEmptyError } from '../../../src/app/errors/questionCannotBeEmpty';
import { InvalidLanguageError } from '../../../src/app/errors/invalidLanguageError';

describe('AnswerQuestionsHandler', () => {

    const mockedAiService = new AIServiceMock()
    const mockedFileService = new FileServiceMock()
    const mockedDbService = new DbServiceMock()
    const languageService = new LanguageService()

    const answerQuestionsHandler = new AnswerQuestionsHandler(
        mockedAiService, mockedFileService, mockedDbService, languageService)

    describe('handle', () => {

        test('have to return the generated call calling using AI', async () => {
            expect(await answerQuestionsHandler.handle(DIR_FILE, FILE_NAME, MOCKED_QUESTION, MOCKED_VALID_LANGUAGE))
                .toBe(await mockedAiService.askAQuestionBasedOnData(
                    await mockedAiService.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE), 
                    MOCKED_QUESTION, 
                    MOCKED_VALID_LANGUAGE
                ))
        })

        test('have to validate that filename cannot be empty', () => {
            expect(async () => await answerQuestionsHandler.handle(DIR_FILE, '', MOCKED_QUESTION, MOCKED_VALID_LANGUAGE))
                .rejects
                .toThrow(FilenameCannotBeEmptyError)
        })

        test('have to validate that question cannot be empty', () => {
            expect(async () => await answerQuestionsHandler.handle(DIR_FILE, FILE_NAME, '', MOCKED_VALID_LANGUAGE))
                .rejects
                .toThrow(QuestionCannotBeEmptyError)
        })

        test('have to validate that only allow valid languages', async () => {
            await expect(async () => 
                    await answerQuestionsHandler.handle(DIR_FILE, FILE_NAME, MOCKED_QUESTION, NOT_ALLOWED_LANGUAGE)
                )
                .rejects
                .toThrow(InvalidLanguageError)
        })

        test('have to save the answer on the DB', async () => {
            const spySaveFile = jest.spyOn(mockedDbService, 'saveQuestionAndAnswerForFileName');

            expect(await answerQuestionsHandler.handle(DIR_FILE, FILE_NAME, MOCKED_QUESTION, MOCKED_VALID_LANGUAGE))
                .toBe(await mockedAiService.askAQuestionBasedOnData(
                    await mockedAiService.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE), 
                    MOCKED_QUESTION, 
                    MOCKED_VALID_LANGUAGE
                ))

            expect(spySaveFile).toHaveBeenCalled()

        })
    })

})