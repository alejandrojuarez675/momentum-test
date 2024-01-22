import { AIService } from "../../../src/app/services/AIService"
import { MOCKED_QUESTION, MOCKED_VALID_LANGUAGE } from "../../mocks/constants"
import { ClientAiMock } from "../../mocks/ports/clientAIMock"

describe('AIService', () => {

    const mockedAiClient = new ClientAiMock()
    const aIService = new AIService(mockedAiClient)

    describe('askAQuestionBasedOnData', () => {
        test('have to consume AI client', async () => {
            expect(await aIService.askAQuestionBasedOnData(
                await aIService.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE),
                MOCKED_QUESTION,
                MOCKED_VALID_LANGUAGE
            )).toBe(await mockedAiClient.askAQuestionBasedOnData(
                await aIService.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE),
                MOCKED_QUESTION,
                MOCKED_VALID_LANGUAGE
            ))
        })
    })

    describe('generateSalesCallTranscript', () => {
        test('have to consume AI client', async () => {
            expect(await aIService.generateSalesCallTranscript(
                MOCKED_VALID_LANGUAGE
            )).toBe(await mockedAiClient.generateSalesCallTranscript(
                MOCKED_VALID_LANGUAGE
            ))
        })
    })

    describe('summarizeData', () => {
        test('have to consume AI client', async () => {
            expect(await aIService.summarizeData(
                await aIService.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE),
                MOCKED_VALID_LANGUAGE
            )).toBe(await mockedAiClient.summarizedData(
                await aIService.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE),
                MOCKED_VALID_LANGUAGE
            ))
        })
    })

})