import { getWins } from '@/apis/winsApi'
import { Win, WinData } from '@models/wins'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Jdenticon from 'react-jdenticon'
import { addWin } from '@/apis/winsApi'
import { getShortName } from '@/lib/utils'

interface Props {
  name: string
}

const initialFormData = {
  title: '',
  author: '',
}

export default function DisplayWins({ name }: Props) {
  const {
    data: wins,
    isLoading,
    error,
  } = useQuery<Win[]>({
    queryKey: ['wins'],
    queryFn: getWins,
  })

  const [form, setForm] = useState<WinData>(initialFormData)

  const queryClient = useQueryClient()

  const winMutation = useMutation({
    mutationFn: addWin,
    onSuccess: (newWin) => {
      const currentWins = queryClient.getQueryData<Win[]>(['wins'])
      if (currentWins) {
        console.log('currentwin', currentWins)
        console.log('newwin', newWin)
        queryClient.setQueryData(['wins'], [...currentWins, newWin])
      } else {
        queryClient.invalidateQueries({ queryKey: ['wins'] })
      }
    },
  })

  if (error) {
    return <p>{`There was an error trying to load the wins!`}</p>
  }

  if (!wins || isLoading) {
    return <p>{`We're loading here...`}</p>
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target

    console.log('this is the form:', form)
    setForm({ ...form, title: value, author: name })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    winMutation.mutate(form)
    setForm(initialFormData)
  }

  if (winMutation.isPending) {
    return <p>{`Adding your win...`}</p>
  }

  if (winMutation.isError) {
    return <p>{`There was an error trying to add your win 😭`}</p>
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
          {wins.sort((a, b) =>( b.id - a.id)).map((win) => (
            <div
              key={win.id}
              id="win-post"
              className="flex w-full border-b border-gray-300 p-8"
            >
              {/* icon */}
              {/* <span className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-400"></span> */}
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
                  <button className="ml-2 text-sm font-semibold">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
