import { getWins } from '@/apis/winsApi'
import { Wins } from '@models/wins'
import { useQuery } from '@tanstack/react-query'
import Jdenticon from 'react-jdenticon'

interface Props {
  name: string
}

export default function DisplayWins({ name }: Props) {
  const {
    data: wins,
    isLoading,
    error,
  } = useQuery<Wins[]>({
    queryKey: ['wins'],
    queryFn: getWins,
  })

  if (error) {
    return <p>There was an error trying to load the wins!</p>
  }

  if (!wins || isLoading) {
    return <p>{`We're loading here...`}</p>
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
              <textarea
                className="rounded-sm border border-gray-500 bg-transparent p-3"
                name=""
                id=""
                rows={3}
                placeholder="What's your win?"
              ></textarea>
              <div className="mt-2 flex justify-between">
                <button className="flex h-8 items-center rounded-sm bg-gray-300 px-3 text-xs hover:bg-gray-400">
                  Post
                </button>
              </div>
            </div>
          </div>
          {wins.map((win) => (
            
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
                    <span className="font-semibold">{win.author}</span>
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
