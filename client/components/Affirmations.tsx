import React from 'react';
import { getAffirmation } from '../apis/apiclient';
import { useQuery } from '@tanstack/react-query';

export default function Affirmation() {
  const {
    data: affirmation,
    isLoading,
    error,
    refetch: refetchAffirmation,
  } = useQuery({ queryKey: ['affirmation'], queryFn: getAffirmation });

  const handleGetNewAffirmation = async () => {
    
    await refetchAffirmation();
  };

  if (error) {
    return <p>Something went wrong</p>;
  }

  if (!affirmation || isLoading) {
    return <p>{`Loading`}</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4"> {affirmation.affirmation}</h1>
      <button
        onClick={handleGetNewAffirmation}
        className="bg-gray-400 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded text-sm"
        type="button"
      >
        Get New Affirmation
      </button>
    </div>
  );
}

