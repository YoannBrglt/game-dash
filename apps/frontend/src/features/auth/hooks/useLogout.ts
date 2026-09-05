
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { logout } from '../api/api'
import { PROFILE_QUERY_KEY } from './useSession'

export function useLogout() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(PROFILE_QUERY_KEY, null)
            queryClient.removeQueries({ queryKey: PROFILE_QUERY_KEY })
            navigate({ to: '/login' })
        },
    })
}