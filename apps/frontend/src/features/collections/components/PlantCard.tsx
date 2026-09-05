import { HugeiconsIcon } from '@hugeicons/react'
import { SproutIcon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'
import { RARITY_STYLE, GILDED_RARITIES, MUTATION_STYLE, MUTED, formatDate, isDiscovered } from '../lib/organicStyles'
import type { Collection, Crop, MutationType } from '@/types/collections'

interface PlantCardProps {
    crop: Crop
    // Toujours les 13 lignes de la crop, non filtrées : la découverte se
    // calcule sur l'ensemble, indépendamment du filtre de type de mutation.
    collections: Collection[]
    // Restreint uniquement les pastilles affichées — n'affecte jamais l'état
    // découverte/verrouillée de la carte.
    mutationTypeFilter?: MutationType | null
    onToggle: (collection: Collection) => void
    pendingIds: Set<number>
}

// Une crop est "découverte" dès qu'au moins une de ses 13 mutations est
// obtenue (n'importe laquelle — voir isDiscovered). Nom et image restent
// toujours visibles ; seul le cadre de la carte passe en gris tant qu'elle
// n'est pas découverte.
export function PlantCard({ crop, collections, mutationTypeFilter, onToggle, pendingIds }: PlantCardProps) {
    const rarityStyle = RARITY_STYLE[crop.rarity.name] ?? RARITY_STYLE.Common
    const discovered = isDiscovered(collections)
    const isGilded = discovered && GILDED_RARITIES.has(crop.rarity.name)
    const visible = mutationTypeFilter
        ? collections.filter((c) => c.mutation.type === mutationTypeFilter)
        : collections
    const mutations = [...visible].sort((a, b) => (a.mutation.order ?? 0) - (b.mutation.order ?? 0))

    return (
        <div
            className={cn('card elev-md plant-card', isGilded && 'gilded')}
            style={{
                boxShadow: discovered
                    ? `0 0 0 1px ${rarityStyle.border} inset, var(--shadow-sm)`
                    : `0 0 0 1px var(--color-neutral-400) inset, var(--shadow-sm)`,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                    className="icon-badge"
                    style={{
                        width: 44,
                        height: 44,
                        background: rarityStyle.tint,
                        color: rarityStyle.border,
                        overflow: 'hidden',
                    }}
                >
                    {crop.imageUrl ? (
                        <img src={crop.imageUrl} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                    ) : (
                        <HugeiconsIcon icon={SproutIcon} size={22} />
                    )}
                </div>
                <span
                    className="tag"
                    style={{ background: rarityStyle.tint, color: rarityStyle.border, fontFamily: 'var(--font-heading)' }}
                >
                    {crop.rarity.name}
                </span>
            </div>
            <div className="card-title">{crop.name}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {mutations.map((collection) => {
                    const style = collection.obtained ? MUTATION_STYLE[collection.mutation.name] ?? MUTED : MUTED
                    const tooltip = collection.obtained
                        ? `${collection.mutation.name} — obtenue${
                              collection.obtainedAt ? ` le ${formatDate(collection.obtainedAt)}` : ''
                          }`
                        : `${collection.mutation.name} — non obtenue`
                    return (
                        <button
                            key={collection.id}
                            type="button"
                            onClick={() => onToggle(collection)}
                            disabled={pendingIds.has(collection.id)}
                            title={tooltip}
                            className={cn(
                                'mut-pill',
                                !collection.obtained && 'mut-muted',
                                collection.obtained && style.extraClass
                            )}
                            style={{
                                background: style.bg,
                                color: style.color,
                                border: 'none',
                                cursor: pendingIds.has(collection.id) ? 'wait' : 'pointer',
                            }}
                        >
                            {collection.mutation.iconUrl && (
                                <img
                                    src={collection.mutation.iconUrl}
                                    alt=""
                                    style={{
                                        width: 11,
                                        height: 11,
                                        objectFit: 'contain',
                                        filter: collection.obtained ? 'none' : 'grayscale(1) opacity(0.6)',
                                    }}
                                />
                            )}
                            {collection.mutation.name}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
