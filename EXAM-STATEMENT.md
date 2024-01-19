# Objective

Develop an application that leverages OpenAI GPT APIs to generate and analyze sales call transcripts. This tool should be capable of creating realistic call transcripts, summarizing these calls, and answering user queries related to the transcript content. No frontend or API is required, the functionality should be able to be performed from the command line and outputs viewable in the console.

Our stack primarily uses Node & TypeScript, but use whatever language you’re comfortable with!

# Requirements

## 1. Generate Call Transcripts

Create a script to generate sales call transcripts. The call transcripts should be outputted to the console and saved to a file for later use.

Here’s an example of what a transcript format should look like:


    00:00:00 Sam (openai.com): Hey there Staya.
    00:00:02 Satya  (microsoft.com): Hi Sam, how are you?
    00:00:05 Sam (openai.com): I'm doing good. Do you think you can give us 10000 more GPUs?
    00:00:06 Satya (microsoft.com): I'm sorry Sam we can't do 10000, how about 5000?
    …


## 2. Summarize Call Transcripts

Create a script that takes a transcript file name as input and generates a summary of the key points from the call transcript. Output the summary to the console.

## 3. Answer Questions

Create a script that takes a call transcript and a user question as command line arguments and answers the user’s question in relation to the call transcript. For example, it should answer a question like “What product was the customer interested in?”. Output the answer to the console.

# Bonus

Update your scripts to support multiple languages such as Spanish or French.
Write some unit tests using a library of your choice (e.g Jest, Mocha, etc.)
Persist chat history between user questions and AI responses to a database
Deliverables

A private GitHub repository containing the source code and a README.md file with setup instructions, usage guide, and project description.

# Evaluation Criteria:

- Functionality: Does the application work as expected?
- Code Clarity: Is the code easy to read and understand? Is it well organized?
- Problem-Solving: How well did you break down the problem and tackle each part? 

# Transparency on AI Usage

While working on the assignment, you can use AI-generated code to assist you in writing your code. However, it is essential to remember that the AI-generated code should only be used as an aid and not as the primary source of your code. You are expected to demonstrate your understanding and thought process in the assignment. To ensure transparency and proper assessment of your work, clearly distinguish the AI-generated code from your own code. You can do this by:

Creating separate commits for AI-generated code and your own code or adding comments to the AI-generated code, such as “// AI-Generated Code” or “/* AI-Generated Code */“, to indicate that the code was generated using AI.
In your assignment submission, include a section in the README file that explains your thought process, the changes you made to the AI-generated code, and any additional information that will help in assessing your work. This will provide a clear understanding of your approach and the extent to which you relied on AI-generated code.