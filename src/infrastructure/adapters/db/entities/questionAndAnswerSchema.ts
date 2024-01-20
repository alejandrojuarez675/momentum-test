const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionAndAnswerSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true,
        unique: true
    },
    filename: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('QA', QuestionAndAnswerSchema);