import { DbService } from "../../../src/app/services/dbService"
import { FILE_NAME, MOCKED_QUESTION_AND_ANSWER } from "../../mocks/constants"
import { DbClientMock } from "../../mocks/ports/dbClientMock"

describe('DbService', () => {

    const mockedDbClient = new DbClientMock()
    const dbService = new DbService(mockedDbClient)

    describe('showHistoryForFileName', () => {
        test('have to consume DB client', async () => {
            expect(await dbService.showHistoryForFileName(
                FILE_NAME
            )).toEqual(await mockedDbClient.getHistoryByFileName(
                FILE_NAME
            ))
        })
    })

    describe('saveQuestionAndAnswerForFileName', () => {
        test('have to consume DB client', async () => {
            expect(await dbService.saveQuestionAndAnswerForFileName(
                MOCKED_QUESTION_AND_ANSWER,
                FILE_NAME
            )).toBe(await mockedDbClient.saveQuestionAndAnswerByFileName(
                MOCKED_QUESTION_AND_ANSWER,
                FILE_NAME
            ))
        })
    })

})