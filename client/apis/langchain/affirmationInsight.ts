import { ChatOpenAI } from 'langchain/chat_models/openai'
import { LLMChain } from 'langchain/chains'
import { PromptTemplate } from 'langchain/prompts'

const chat = new ChatOpenAI({
  temperature: 0.75,
  modelName: 'gpt-3.5-turbo-1106',
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
})

// TODO: Improve the prompt to get something closer to what you want.
const prompt = new PromptTemplate({
  template: `Please provide additional insight about this affirmation: {affirmation}`,
  inputVariables: ['affirmation'],
})

const chain = new LLMChain({
  llm: chat,
  prompt: prompt,
})

//TODO: Add a parameter to the function that allows to pass an affirmation into it, to be used as the value for the affirmation property in the object used to invoke the chain.
//TODO: Come up with a way of returning what we want from the chain at the end of the function.
export async function affirmation() {
  const response = await chain.invoke({
    affirmation: 'The quick brown fox jumps over the lazy dog.',
  })

  console.log(response.text)
}
