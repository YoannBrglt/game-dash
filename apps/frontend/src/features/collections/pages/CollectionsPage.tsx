import { useMemo, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { SproutIcon } from '@hugeicons/core-free-icons'
import { useCollectionStats } from '../hooks/useCollectionStats'
import { useToggleCollection } from '../hooks/useToggleCollection'
import { PlantCard } from '../components/PlantCard'
import { CyclingStatCard } from '../components/CyclingStatCard'
import { OrganicToaster } from '../components/OrganicToaster'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { RARITY_STYLE, formatDate, isDiscovered } from '../lib/organicStyles'
import type { MutationType } from '@/types/collections'

interface FiltersValue {
    search: string
    rarityId: number | null
    mutationType: MutationType | null
    discoveredOnly: boolean
}

const DEFAULT_FILTERS: FiltersValue = {
    search: '',
    rarityId: null,
    mutationType: null,
    discoveredOnly: false,
}

const MUTATION_TYPES: { value: MutationType; label: string }[] = [
    { value: 'base', label: 'Base' },
    { value: 'weather', label: 'Météo' },
    { value: 'specific', label: 'Spécifique' },
    { value: 'rarity', label: 'Rareté' },
]

export function CollectionsPage() {
    const { isPending, isError, refetch, allGroups, rarities, lastObtained, stats } = useCollectionStats()
    const { requestToggle, pendingUncheck, confirmUncheck, cancelUncheck, pendingIds } = useToggleCollection()
    const [filters, setFilters] = useState<FiltersValue>(DEFAULT_FILTERS)
    // État (pas useRef) : le Portal de @base-ui/react résout `container` dans
    // un effet qui ne redéclenche que si la VALEUR passée change — un
    // useRef garde la même identité d'objet à chaque rendu, donc si
    // `.current` est encore null au premier passage, le portal reste bloqué
    // sur son fallback (document.body) pour toujours. Un ref-callback qui
    // pousse l'élément dans un state change bien de valeur.
    const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null)

    const groups = useMemo(() => {
        const search = filters.search.trim().toLowerCase()
        return allGroups.filter(({ crop, collections }) => {
            if (search && !crop.name.toLowerCase().includes(search)) return false
            if (filters.rarityId && crop.rarityId !== filters.rarityId) return false
            if (filters.discoveredOnly && !isDiscovered(collections)) return false
            return true
        })
    }, [allGroups, filters])

    if (isPending) {
        return <p className="text-muted">Chargement de la collection...</p>
    }

    if (isError) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <p style={{ color: 'var(--color-accent-700)' }}>Impossible de charger la collection.</p>
                <button type="button" className="btn btn-secondary" onClick={() => refetch()}>
                    Réessayer
                </button>
            </div>
        )
    }

    return (
        <div ref={setRootEl} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
                    gap: 'var(--space-4)',
                }}
            >
                <CyclingStatCard stats={stats} />
                <div className="card elev-sm" style={{ flexDirection: 'row', alignItems: 'center', gap: 'var(--space-3)' }}>
                    {(() => {
                        const rarityStyle = lastObtained ? RARITY_STYLE[lastObtained.crop.rarity.name] ?? RARITY_STYLE.Common : undefined
                        return (
                            <div
                                className="icon-badge"
                                style={{
                                    width: 48,
                                    height: 48,
                                    background: rarityStyle?.tint ?? 'var(--color-accent-2-100)',
                                    color: rarityStyle?.border ?? 'var(--color-accent-2-700)',
                                    overflow: 'hidden',
                                }}
                            >
                                {lastObtained?.crop.imageUrl ? (
                                    <img src={lastObtained.crop.imageUrl} alt="" style={{ width: 26, height: 26, objectFit: 'contain' }} />
                                ) : (
                                    <HugeiconsIcon icon={SproutIcon} size={22} />
                                )}
                            </div>
                        )
                    })()}
                    <div>
                        <div className="card-kicker">Dernière découverte</div>
                        <div className="card-title" style={{ fontSize: 18, display: 'flex', alignItems: 'center', gap: 6 }}>
                            {lastObtained ? (
                                <>
                                    {lastObtained.crop.name}
                                    <span style={{ opacity: 0.5 }}>·</span>
                                    {lastObtained.mutation.iconUrl && (
                                        <img
                                            src={lastObtained.mutation.iconUrl}
                                            alt=""
                                            style={{ width: 16, height: 16, objectFit: 'contain' }}
                                        />
                                    )}
                                    {lastObtained.mutation.name}
                                </>
                            ) : (
                                '—'
                            )}
                        </div>
                        <div className="card-meta">
                            {lastObtained?.obtainedAt ? formatDate(lastObtained.obtainedAt) : 'Aucune pour le moment'}
                        </div>
                    </div>
                </div>
            </section>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input
                    className="input"
                    style={{ maxWidth: 220 }}
                    placeholder="Rechercher une plante..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
                <select
                    className="input"
                    style={{ maxWidth: 180 }}
                    value={filters.rarityId ?? ''}
                    onChange={(e) =>
                        setFilters({ ...filters, rarityId: e.target.value ? Number(e.target.value) : null })
                    }
                >
                    <option value="">Toutes raretés</option>
                    {rarities.map((rarity) => (
                        <option key={rarity.id} value={rarity.id}>
                            {rarity.name}
                        </option>
                    ))}
                </select>
                <select
                    className="input"
                    style={{ maxWidth: 200 }}
                    value={filters.mutationType ?? ''}
                    onChange={(e) =>
                        setFilters({ ...filters, mutationType: (e.target.value || null) as MutationType | null })
                    }
                >
                    <option value="">Tous types de mutation</option>
                    {MUTATION_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    <input
                        type="checkbox"
                        checked={filters.discoveredOnly}
                        onChange={(e) => setFilters({ ...filters, discoveredOnly: e.target.checked })}
                    />
                    Découvertes seulement
                </label>
            </div>

            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                    <HugeiconsIcon icon={SproutIcon} size={20} style={{ color: 'var(--color-accent-700)' }} />
                    <h3 style={{ margin: 0 }}>Collection de cultures</h3>
                </div>

                {groups.length === 0 ? (
                    <p className="text-muted">Aucune plante ne correspond à ces filtres.</p>
                ) : (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
                            gap: 'var(--space-4)',
                        }}
                    >
                        {groups.map(({ crop, collections }) => (
                            <PlantCard
                                key={crop.id}
                                crop={crop}
                                collections={collections}
                                mutationTypeFilter={filters.mutationType}
                                onToggle={requestToggle}
                                pendingIds={pendingIds}
                            />
                        ))}
                    </div>
                )}
            </section>

            <OrganicToaster container={rootEl} />

            <ConfirmDialog
                open={pendingUncheck !== null}
                onOpenChange={(open) => {
                    if (!open) cancelUncheck()
                }}
                title="Retirer cette mutation ?"
                description={
                    pendingUncheck
                        ? `"${pendingUncheck.mutation.name}" sera retirée de "${pendingUncheck.crop.name}" dans ta collection. Tu pourras la rajouter plus tard si c'est une erreur.`
                        : ''
                }
                confirmLabel="Retirer"
                cancelLabel="Annuler"
                onConfirm={confirmUncheck}
                container={rootEl}
            />
        </div>
    )
}
