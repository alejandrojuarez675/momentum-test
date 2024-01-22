import { promises as fs } from 'fs';
import { IAiService } from "../../../src/app/services/interfaces/IAiService";
import { ValidLanguage } from "../../../src/domain/validLanguageSupport";
import { MOCKED_ANSWER, MOCKED_QUESTION, MOCKED_VALID_LANGUAGE } from "../constants";

export class AIServiceMock implements IAiService {

    async askAQuestionBasedOnData(data: String, question: String, language: ValidLanguage): Promise<String> {
        if (
          data == (await this.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE)) &&
          question == MOCKED_QUESTION &&
          language == MOCKED_VALID_LANGUAGE
        ) {
          return Promise.resolve(MOCKED_ANSWER);
        } else {
          throw new Error("Mock option not implemented.");
        }
    }

    async generateSalesCallTranscript(language: ValidLanguage): Promise<String> {
        if (language == MOCKED_VALID_LANGUAGE) {
            return await fs.readFile('tests/mocks/chat-example.txt', { encoding: 'utf8' })
        } else {
            throw new Error("Mock option not implemented.");
        }
    }

    async summarizeData(data: String, language: ValidLanguage): Promise<String> {
        if (
            data == (await this.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE)) &&
            language == MOCKED_VALID_LANGUAGE
        ) {
            return await fs.readFile('tests/mocks/summary-example.txt', { encoding: 'utf8' })
        } else {
            throw new Error("Mock option not implemented.");
        }
    }
    
}