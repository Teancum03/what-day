import { useOutletContext } from 'react-router-dom'

import { ContextType } from '@models/user'

export function useUser() {
  return useOutletContext<ContextType>()
}
