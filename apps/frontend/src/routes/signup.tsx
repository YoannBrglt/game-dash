// src/routes/signup.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { PROFILE_QUERY_KEY } from '@/features/auth/hooks/useSession'
import { getProfile } from '@/features/auth/api/api'
import { SignupPage } from '@/features/auth/pages/signup'

export const Route = createFileRoute('/signup')({
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
    component: SignupPage,
})