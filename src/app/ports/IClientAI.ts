export interface IClientAI {
    askAQuestionBasedOnData(data: String, question: String, language: String): Promise<String>;
    summarizedData(data: String, language: String): Promise<String>;
    generateSalesCallTranscript(language: String): Promise<String>;
    translate(data: String, from: String, to: String): Promise<String>;
}