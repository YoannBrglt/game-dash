import { createFileRoute, redirect } from '@tanstack/react-router'
import { PROFILE_QUERY_KEY, useSession } from '@/features/auth/hooks/useSession'
import { getProfile, isUnauthorized } from '@/features/auth/api/api'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { CollectionsPage } from '@/features/collections/pages/CollectionsPage'
import '@/styles/organic.css'

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
  const { data: user } = useSession()
  const logout = useLogout()

  return (
    <div className="organic-theme" style={{ minHeight: '100vh', padding: 'var(--space-8)' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <div>

          <h1 style={{ color: 'var(--color-accent-700)', marginBottom: 'var(--space-2)' }}>Magic Garden</h1>
          <div className="seg">
            <label className="seg-opt">
              <input type="radio" name="collection-tab" checked readOnly />
              <span>Plantes</span>
            </label>
            <label className="seg-opt" style={{ opacity: 0.45, cursor: 'not-allowed' }} title="Bientôt disponible">
              <input type="radio" name="collection-tab" disabled />
              <span>Animaux · bientôt</span>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 13 }}>
          <span className="text-muted">{user?.fullName ?? user?.email}</span>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
          >
            {logout.isPending ? 'Déconnexion...' : 'Déconnexion'}
          </button>
        </div>
      </header>

      <CollectionsPage />
    </div>
  )
}
