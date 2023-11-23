import React, { useEffect, useState } from 'react';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { LLMChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import { getAffirmation } from '../apiclient';
import { useQuery } from '@tanstack/react-query';
import { Affirmation } from '../../../models/affirmation';

const AffirmationComponent: React.FC = () => {
  const { data: affirmationData, isLoading, error } = useQuery<Affirmation>({
    queryKey: ['affirmation'],
    queryFn: getAffirmation,
  });

  const [userInput, setUserInput] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (submitted) {
      generateInsight(affirmationData?.affirmation || '', userInput);
      setSubmitted(false); 
    }
  }, [submitted, affirmationData, userInput]);

  const generateInsight = async (affirmation: string, userMessage: string) => {
    console.log('Affirmation:', affirmation);
    console.log('User Message:', userMessage);

    try {
      const chat = new ChatOpenAI({
        temperature: 0.75,
        modelName: 'gpt-3.5-turbo-1106',
        openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
      });

      const prompt = new PromptTemplate({
        template: `Provide insights on the affirmation: {affirmation}. User message: {userMessage}`,
        inputVariables: ['affirmation', 'userMessage'],
      });

      const chain = new LLMChain({
        llm: chat,
        prompt: prompt,
      });

      const response = await chain.invoke({
        affirmation: affirmation,
        userMessage: userMessage,
      });

      console.log('Insight Response:', response);

      setAiResponse(response.text);
    } catch (error) {
      console.error('Error generating insight:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    setSubmitted(true);
  };

  if (error) {
    return <p>Something went wrong</p>;
  }

  if (!affirmationData || isLoading) {
    return <p>{`Loading`}</p>;
  }

  return (
    <div className='insight'>
      <div className="max-w-xl mt-20 mx-auto">
       

        {/* User Input Text Area */}
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Your Message
        </label>
        <textarea
          id="userMessage"
          rows={5}
          value={userInput}
          onChange={handleInputChange}
          className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" // Added text-sm class
          placeholder="Your Message"
        ></textarea>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded text-sm" // Added text-sm class
            type="button"
          >
            Send Message
          </button>
        </div>

        {/* AI Response Text Area */}
        {aiResponse && (
          <div className="mt-8 mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              AI Response
            </label>
            <textarea
              rows={8}
              value={aiResponse}
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm" // Added text-sm class
              readOnly
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffirmationComponent;










