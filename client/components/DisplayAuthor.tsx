import Jdenticon from 'react-jdenticon'

import { getShortName } from '@/lib/utils'

interface Props {
  name: string
}

function DisplayAuthor({ name }: Props) {
  return (
    <div className="flex items-center">
      <div>
        <Jdenticon size="36" value={name} />
      </div>
      <span className="font-header text-sm text-purple lg:text-xl lg:leading-none">
        {getShortName(name)}
      </span>
    </div>
  )
}

export default DisplayAuthor
