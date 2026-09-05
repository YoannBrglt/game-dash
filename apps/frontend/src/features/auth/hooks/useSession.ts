import { useQuery } from '@tanstack/react-query'

import { getProfile, isUnauthorized } from '@/features/auth/api/api'
export const PROFILE_QUERY_KEY = ['profile'] as const

export function useSession() {
    return useQuery({
        queryKey: PROFILE_QUERY_KEY,
        queryFn: getProfile,
        retry: (failureCount, error) => {
            // Pas de retry sur 401 : c'est un état "non connecté" normal, pas une erreur réseau
            if (isUnauthorized(error)) return false
            return failureCount < 2
        },
        staleTime: 5 * 60 * 1000, // 5 min : évite de re-vérifier la session à chaque focus
    })
}