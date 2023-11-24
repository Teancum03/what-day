import { ChatOpenAI } from 'langchain/chat_models/openai'
import { LLMChain } from 'langchain/chains'
import { PromptTemplate } from 'langchain/prompts'

export const generateInsight = async (
  affirmation: string,
  userMessage: string
) => {
  try {
    const chat = new ChatOpenAI({
      temperature: 0.75,
      modelName: 'gpt-3.5-turbo-1106',
      openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
    })

    const prompt = new PromptTemplate({
      template: `Provide insights on the affirmation: {affirmation}. User message: {userMessage}`,
      inputVariables: ['affirmation', 'userMessage'],
    })

    const chain = new LLMChain({
      llm: chat,
      prompt: prompt,
    })

    const response = await chain.invoke({
      affirmation: affirmation,
      userMessage: userMessage,
    })

    return response.text
  } catch (error) {
    console.error('Error generating insight:', error)
  }
}
