import { getAffirmation } from '../apis/apiclient';
import { useQuery } from '@tanstack/react-query';

export default function Affirmation() {
  const {
    data: affirmation,
    isLoading,
    error,
  } = useQuery({ queryKey: ['affirmation'], queryFn: getAffirmation });

  if (error) {
    return <p>Something went wrong</p>;
  }

  if (!affirmation || isLoading) {
    return <p>{`Loading`}</p>;
  }

  return (
    <div>
      <p>{affirmation.affirmation}</p>
    </div>
  );
}
