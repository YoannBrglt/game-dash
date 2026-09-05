import { useQuery } from '@tanstack/react-query'
import { getCollections } from '../api/api'

export const COLLECTIONS_QUERY_KEY = ['collections'] as const

export function useCollections() {
    return useQuery({
        queryKey: COLLECTIONS_QUERY_KEY,
        queryFn: getCollections,
        staleTime: 60 * 1000,
    })
}
