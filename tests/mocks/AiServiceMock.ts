import { IAiService } from "../../src/app/services/interfaces/IAiService";
import { ValidLanguage } from "../../src/domain/validLanguageSupport";
import { promises as fs } from 'fs';

export class AIServiceMock implements IAiService {
    askAQuestionBasedOnData(data: String, question: String, language: ValidLanguage): Promise<String> {
        throw new Error("Method not implemented.");
    }
    async generateSalesCallTranscript(language: ValidLanguage): Promise<String> {
        return await fs.readFile('tests/mocks/chat-example.txt', { encoding: 'utf8' })
    }
    summarizeData(data: String, language: ValidLanguage): Promise<String> {
        throw new Error("Method not implemented.");
    }
    translate(data: String, from: ValidLanguage, to: ValidLanguage): Promise<String> {
        throw new Error("Method not implemented.");
    }

}