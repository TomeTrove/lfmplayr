import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

const queryClient = new QueryClient()

export function QueryContextProvider(props:PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    )
}