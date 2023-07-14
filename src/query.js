import { getChain } from "./index.js";

const args = process.argv.slice(2);
const query = args[0];

const qaChain = getChain();

const { text: answer } = await qaChain.call({
  query,
});
console.log(answer);
