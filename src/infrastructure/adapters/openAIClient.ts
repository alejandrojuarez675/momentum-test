import { IClientAI } from "../../app/ports/IClientAI";
import OpenAI from "openai";

export class OpenAIClient implements IClientAI {

  constructor(private openAi = new OpenAI()) {}

  askAQuestionBasedOnData(data: String, question: String): String {
    throw new Error("Method not implemented.");
  }

  summarizedData(data: String): String {
    throw new Error("Method not implemented.");
  }

  async generateSalesCallTranscript(): Promise<String> {
    const completion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a database of sales calls. I want to have an example of a call.
          I need that you invent names for tu prospect and the sales representative.
          I need that you provide me the information on next format:
          {hour} {user} ({company website "mycompany.com"}): {msg}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    
    return completion.choices[0].message.content || "";
  }
}
