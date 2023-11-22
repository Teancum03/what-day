import { WinData } from '@models/wins'

import { useState } from 'react'
import Jdenticon from 'react-jdenticon'

import { getShortName } from '@/lib/utils'
import { useWin } from '@/hooks/wins'

interface Props {
  name: string
}

const initialFormData = {
  title: '',
  author: '',
}

export default function DisplayWins({ name }: Props) {
  const { data: wins, isLoading, error } = useWin()

  const [form, setForm] = useState<WinData>(initialFormData)
  const { addWin } = useWin()

  if (error) {
    return <p>{`There was an error trying to load the wins!`}</p>
  }

  if (!wins || isLoading) {
    return <p>{`We're loading here...`}</p>
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target
    setForm({ ...form, title: value, author: name })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await addWin.mutate(form)
    setForm(initialFormData)
  }

 

  return (
    <>
      <div id="add-win">
        <div className="flex-grow overflow-auto">
          <div className="flex w-full border-b-4 border-gray-300 p-8">
            <div>
              <Jdenticon size="36" value={name} />
            </div>
            <div className="ml-4 flex flex-grow flex-col">
              <form
                className="ml-4 flex flex-grow flex-col"
                onSubmit={handleSubmit}
                aria-label="Add Win"
              >
                <textarea
                  className="rounded-sm border border-gray-500 bg-transparent p-3"
                  name=""
                  id=""
                  rows={3}
                  placeholder="What's your win?"
                  onChange={handleChange}
                ></textarea>
                <div className="mt-2 flex justify-between">
                  <button
                    className="flex h-8 items-center rounded-sm bg-gray-300 px-3 text-xs hover:bg-gray-400"
                    type="submit"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
          {wins
            .sort((a, b) => b.id - a.id)
            .map((win) => (
              <div
                key={win.id}
                id="win-post"
                className="flex w-full border-b border-gray-300 p-8"
              >
                {/* icon */}
                
                <div>
                  <Jdenticon size="36" value={win.author} />
                </div>

                <div className="ml-4 flex flex-grow flex-col">
                  {/* author */}
                  <div className="flex">
                    <span className="font-semibold">
                      {getShortName(win.author)}
                    </span>
                  </div>

                  {/* title */}
                  <p className="mt-1">{win.title}</p>

                  {/* ratings */}
                  <div className="mt-2 flex">
                    <button className="text-sm font-semibold">Like</button>
                    <button className="ml-2 text-sm font-semibold">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
