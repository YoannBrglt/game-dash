
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { login } from '../api/api'
import { PROFILE_QUERY_KEY } from './useSession'
import type { LoginPayload } from '@/types/auth'

export function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (payload: LoginPayload) => login(payload),
        onSuccess: (user) => {
            queryClient.setQueryData(PROFILE_QUERY_KEY, user)
            navigate({ to: '/dashboard' })
        },
    })
}