import { createFileRoute, redirect } from '@tanstack/react-router'
import { PROFILE_QUERY_KEY } from '@/features/auth/hooks/useSession'
import { getProfile, isUnauthorized } from '@/features/auth/api/api'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData({
        queryKey: PROFILE_QUERY_KEY,
        queryFn: getProfile,
      })
    } catch (error) {
      if (isUnauthorized(error)) {
        throw redirect({ to: '/login' })
      }
      throw error
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>
}
