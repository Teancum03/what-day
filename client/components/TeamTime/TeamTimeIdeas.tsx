import { useQuery } from '@tanstack/react-query'
import React, { Ref } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import * as Tabs from '@radix-ui/react-tabs'

import { TeamTime } from '@models/teamTime'
import { getIdeas } from '@/apis/teamTimeApi'
import IdeaDialog from '@/components/TeamTime/IdeaDialog'

export function TeamTimeIdeas() {
  const {
    data: ideas,
    isLoading,
    error,
  } = useQuery<TeamTime[]>({
    queryKey: ['ideas'],
    queryFn: getIdeas,
  })

  if (error instanceof Error) {
    return <p>Error: unable to load ideas</p>
  }
  if (!ideas || isLoading) {
    return <p>Loading ideas...</p>
  }

  return (
    // <div className="m-auto xl:w-3/4 ">
    <div className="-m-auto flex  flex-wrap justify-center">
      {ideas.map((idea) => (
        <div className="m-auto w-auto p-10 " key={idea.id}>
          <IdeaDialog idea={idea.idea} description={idea.description} />
        </div>
      ))}
    </div>
    // </div>
  )
}
