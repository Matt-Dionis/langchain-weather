import * as dotenv from "dotenv";
import { OpenAI } from "langchain";
import { JSONLoader } from "langchain/document_loaders";
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { VectorDBQAChain } from "langchain/chains";

dotenv.config();

let chain;

const init = async () => {
  // init the model
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  // load the document
  const loader = new JSONLoader("data/formatted_data.json");
  const docs = await loader.load();

  // Load the docs into the vector store
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  // Create a chain that uses the OpenAI LLM and HNSWLib vector store.
  chain = VectorDBQAChain.fromLLM(model, vectorStore);
};

await init();

function getChain() {
  return chain;
}

export {
  getChain,
};
