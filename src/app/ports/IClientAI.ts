export interface IClientAI {
    askAQuestionBasedOnData(data: String, question: String): String;
    summarizedData(data: String): Promise<String>;
    generateSalesCallTranscript(): Promise<String>;
}