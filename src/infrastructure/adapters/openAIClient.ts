import { IClientAI } from "../../app/ports/IClientAI";
import OpenAI from "openai";

export class OpenAIClient implements IClientAI {

  MODEL = "gpt-3.5-turbo"

  constructor(private openAi = new OpenAI()) {}

  async askAQuestionBasedOnData(data: String, question: String, language: String): Promise<String> {
    console.log("searching a response on data...")
    
    const summarizedData = await this.openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a assistant that can ask question based on information on a call transcriptions.
          `,
        },
        {
          role: "user",
          content: `I need to respond the question "${question}" based on the information on the next text: "${data}".
                    Please I need it in ${language}`,
        }
      ],
      model: this.MODEL,
    });
    
    return summarizedData.choices[0].message.content || "";  
  }

  async summarizedData(data: String, language: String): Promise<String> {
    console.log("summarizing data...")
    
    const summarizedData = await this.openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a assistant that can summarized call transcriptions.`,
        },
        {
          role: "user",
          content: `I need to summarize the next text: "${data}".
                  Please I need it in ${language}`,
        }
      ],
      model: this.MODEL,
    });
    
    return summarizedData.choices[0].message.content || "";
  }

  async generateSalesCallTranscript(language: String): Promise<String> {
    console.log("generating sales call transcription...")

    const completion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a database of sales calls. I want to have an example of a call.
          I need that you invent names for tu prospect and the sales representative.
          I need that you provide me the information on next format in ${language}:
          {hour} {user} ({company website "mycompany.com"}): {msg}`,
        },
      ],
      model: this.MODEL,
    });
    
    return completion.choices[0].message.content || "";
  }

  async translate(data: String, from: String, to: String): Promise<String> {
    console.log(`translating data from ${from} to ${to}...`)

    const completion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You will be provided with a sentence in ${from}, and your task is to translate it into ${to}.`,
        },
        {
          role: "user",
          content: data.toString(),
        }
      ],
      model: this.MODEL,
    });
    
    return completion.choices[0].message.content || "";
  }
}
