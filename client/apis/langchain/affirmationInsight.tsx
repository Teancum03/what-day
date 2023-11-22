// AffirmationComponent.tsx

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

  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (affirmationData) {
      generateInsight(affirmationData.affirmation);
    }
  }, [affirmationData]);

  const generateInsight = async (affirmation: string) => {
    console.log('Affirmation:', affirmation);
  
    try {
      const chat = new ChatOpenAI({
        temperature: 0.75,
        modelName: 'gpt-3.5-turbo-1106',
        openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
      });
  
      const prompt = new PromptTemplate({
        template: `Provide insights on the affirmation: {affirmation}`,
        inputVariables: ['affirmation'],
      });
  
      const chain = new LLMChain({
        llm: chat,
        prompt: prompt,
      });
  
      const response = await chain.invoke({
        affirmation: affirmation,
      });
  
      console.log('Insight Response:', response);
  
      setResult(response.text);
    } catch (error) {
      console.error('Error generating insight:', error);
    }
  };
  

  if (error) {
    return <p>Something went wrong</p>;
  }

  if (!affirmationData || isLoading) {
    return <p>{`Loading`}</p>;
  }

  return (
    <div>
      {result && <p>Insight: {result}</p>}
    </div>
  );
};

export default AffirmationComponent;



