export interface IClientAI {
    askAQuestionBasedOnData(data: String, question: String): Promise<String>;
    summarizedData(data: String): Promise<String>;
    generateSalesCallTranscript(): Promise<String>;
    translate(data: String, from: String, to: String): Promise<String>;
}