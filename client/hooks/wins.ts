import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import * as API from '@/apis/winsApi'

export function useWin() {
  const query = useQuery({
    queryKey: ['wins'],
    queryFn: API.getWins,
  })

  return {
    ...query,
    addWin: useAddMutation(),
  }
}

export function useWinMutation<TData = unknown, TVariables = unknown>(
  apiClientFunction: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: apiClientFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wins'] })
    },
  })

  return mutation
}

export function useAddMutation() {
  return useWinMutation(API.addWin)
}
