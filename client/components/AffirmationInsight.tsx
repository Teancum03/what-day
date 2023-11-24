import React, { useEffect, useState } from 'react'
import { getAffirmation } from '@/apis/apiclient'
import { useQuery } from '@tanstack/react-query'
import { Affirmation } from '@models/affirmation'
import { generateInsight } from '@/apis/langchain/affirmationInsight'

const AffirmationComponent: React.FC = () => {
  const {
    data: affirmationData,
    isLoading,
    error,
  } = useQuery<Affirmation>({
    queryKey: ['affirmation'],
    queryFn: getAffirmation,
  })

  const [userInput, setUserInput] = useState<string>('')
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  async function loadInsight() {
    try {
      const response = await generateInsight(
        affirmationData?.affirmation || '',
        userInput
      )
      setAiResponse(response)
      setSubmitted(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (submitted) {
      loadInsight()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, affirmationData, userInput])

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value)
  }

  const handleSendMessage = () => {
    setSubmitted(true)
  }

  if (error) {
    return <p>Something went wrong loading your insight</p>
  }

  if (!affirmationData || isLoading) {
    return <p>{`Loading`}</p>
  }

  return (
    <div className="insight">
      <div className="mx-auto mt-20 max-w-xl">
        {/* User Input Text Area */}
        <label
          htmlFor="userMessage"
          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
        >
          Your Message
        </label>
        <textarea
          id="userMessage"
          rows={4}
          value={userInput}
          onChange={handleInputChange}
          className="mb-3 block w-full rounded border border-gray-200 bg-gray-200 px-4 py-3 text-sm leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none" // Added text-sm class
          placeholder="Your Message"
        ></textarea>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSendMessage}
            className="rounded bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-400" // Added text-sm class
            type="button"
          >
            Send Message
          </button>
        </div>

        {/* AI Response Text Area */}
        {aiResponse && (
          <div className="mb-4 mt-8">
            <label
              htmlFor="aiResponse"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            >
              AI Response
            </label>
            <textarea
              id="aiResponse"
              rows={10}
              value={aiResponse}
              className="block w-full rounded border border-gray-200 bg-gray-200 px-4 py-3 text-sm leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none" // Added text-sm class
              readOnly
            ></textarea>
          </div>
        )}
      </div>
    </div>
  )
}

export default AffirmationComponent
