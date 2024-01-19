export interface IClientAI {
    askAQuestionBasedOnData(data: String, question: String): String;
    summarizedData(data: String): String;
    generateSalesCallTranscript(): String;
}