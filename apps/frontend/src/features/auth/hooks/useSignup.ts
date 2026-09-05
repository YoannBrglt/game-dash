import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { signup } from '../api/api'
import { PROFILE_QUERY_KEY } from './useSession'
import type { SignupPayload } from '@/types/auth'

export function useSignup() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (payload: SignupPayload) => signup(payload),
        onSuccess: (user) => {
            queryClient.setQueryData(PROFILE_QUERY_KEY, user)
            navigate({ to: '/dashboard' })
        },
    })
}