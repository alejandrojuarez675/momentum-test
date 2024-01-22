import { ValidLanguage } from "../../../domain/validLanguageSupport"

export interface IAiService {
    askAQuestionBasedOnData(data: String, question: String, language: ValidLanguage): Promise<String>
    generateSalesCallTranscript(language: ValidLanguage): Promise<String>
    summarizeData(data: String, language: ValidLanguage): Promise<String>
    translate(data: String, from: ValidLanguage, to: ValidLanguage): Promise<String>
}
