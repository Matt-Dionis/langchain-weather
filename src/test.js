import * as dotenv from "dotenv";
import * as fs from 'fs';
import { OpenAI } from "langchain";
import { createJsonAgent, JsonToolkit } from "langchain/agents";
import { JsonSpec } from "langchain/tools";

dotenv.config();

const rawdata = fs.readFileSync('data/formatted_data.json');
const data = JSON.parse(rawdata);

const jsonSpec = new JsonSpec(data);
const jsonToolkit = new JsonToolkit(jsonSpec);

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const jsonAgentExecutor = createJsonAgent(model, jsonToolkit);

jsonAgentExecutor.call({ input: "What was the high on July 4, 1976?" });
