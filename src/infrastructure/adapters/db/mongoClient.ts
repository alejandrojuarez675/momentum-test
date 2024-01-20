import { IDbClient } from "../../../app/ports/IDbClient";
import { QuestionAndAnswer } from "../../../domain/questionAnswerDomain";
const mongoose = require('mongoose');
const QuestionAndAnswerSchema = require("./entities/questionAndAnswerSchema")

export class MongoDbClient implements IDbClient {


    constructor(){
        mongoose.connect('mongodb://localhost/momentum-db', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('MongoDB connected'))
            .catch((err: any) => console.log(err));
    }

    async getHistoryByFileName(fileName: String): Promise<QuestionAndAnswer[]> {
        const questionAndAnswer =  await QuestionAndAnswerSchema.find({ filename: fileName });
        
        return questionAndAnswer.map((x: { question: any; answer: any }) => {
          return { question: x.question, answer: x.answer };
        });
    }

    async saveQuestionAndAnswerByFileName(questionAndAnswer: QuestionAndAnswer, fileName: String) {
        const newQAndA = new QuestionAndAnswerSchema({
            question: questionAndAnswer.question,
            answer: questionAndAnswer.answer,
            filename: fileName,
        })

        await newQAndA.save()
        console.log("Saved question and answer on the DB...")
    }

}

