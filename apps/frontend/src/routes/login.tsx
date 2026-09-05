// src/routes/login.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { PROFILE_QUERY_KEY } from '@/features/auth/hooks/useSession'
import { getProfile } from '@/features/auth/api/api'
import { LoginPage } from '@/features/auth/pages/login'

export const Route = createFileRoute('/login')({
    beforeLoad: async ({ context }) => {
        try {
            await context.queryClient.ensureQueryData({
                queryKey: PROFILE_QUERY_KEY,
                queryFn: getProfile,
            })
        } catch {
            return // pas connecté, on laisse passer
        }
        throw redirect({ to: '/dashboard' })
    },
    component: LoginPage,
})
