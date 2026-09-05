import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCollection, type UpdateCollectionPayload } from '../api/api'
import { COLLECTIONS_QUERY_KEY } from './useCollections'
import type { Collection } from '@/types/collections'

export function useUpdateCollection() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateCollectionPayload }) =>
            updateCollection(id, payload),

        onMutate: async ({ id, payload }) => {
            await queryClient.cancelQueries({ queryKey: COLLECTIONS_QUERY_KEY })

            const previous = queryClient.getQueryData<Collection[]>(COLLECTIONS_QUERY_KEY)

            queryClient.setQueryData<Collection[]>(COLLECTIONS_QUERY_KEY, (old) =>
                old?.map((collection) =>
                    collection.id === id ? { ...collection, ...payload } : collection
                )
            )

            return { previous }
        },

        onError: (_error, _variables, context) => {
            if (context?.previous) {
                queryClient.setQueryData(COLLECTIONS_QUERY_KEY, context.previous)
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: COLLECTIONS_QUERY_KEY })
        },
    })
}
