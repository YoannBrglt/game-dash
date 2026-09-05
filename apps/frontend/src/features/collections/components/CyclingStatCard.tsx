import { useEffect, useState } from 'react'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'

// Une sous-valeur d'un stat "composé" (ex: Gold X/Y, Rainbow X/Y côte à côte
// dans une même carte).
export interface StatItem {
    iconUrl?: string | null
    icon?: IconSvgElement
    value: string
}

export interface Stat {
    kicker: string
    meta: string
    // Stat "simple" : un seul gros nombre avec son icon-badge.
    icon?: IconSvgElement
    iconBg?: string
    iconColor?: string
    title?: string
    // Stat "composée" : plusieurs valeurs affichées côte à côte, chacune
    // avec sa propre icône (ex: mutations rares -> Gold / Rainbow).
    items?: StatItem[]
}

interface CyclingStatCardProps {
    stats: Stat[]
    intervalMs?: number
}

// Carte de stat qui défile automatiquement parmi plusieurs métriques
// (retour utilisateur : la case "complétion" doit pouvoir en montrer
// plusieurs — complétion globale, mutations collectées, moyenne par plante,
// mutations rares... — d'autres pourront s'ajouter à la liste plus tard).
export function CyclingStatCard({ stats, intervalMs = 6000 }: CyclingStatCardProps) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (stats.length <= 1) return
        const id = setInterval(() => setIndex((i) => (i + 1) % stats.length), intervalMs)
        return () => clearInterval(id)
    }, [stats.length, intervalMs])

    const stat = stats[index % stats.length]
    if (!stat) return null

    return (
        <div className="card elev-sm" style={{ flexDirection: 'row', alignItems: 'center', gap: 'var(--space-3)' }}>
            {stat.icon && (
                <div className="icon-badge" style={{ width: 48, height: 48, background: stat.iconBg, color: stat.iconColor }}>
                    <HugeiconsIcon icon={stat.icon} size={22} />
                </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div className="card-kicker">{stat.kicker}</div>
                {stat.items ? (
                    <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                        {stat.items.map((item, i) => (
                            <span
                                key={i}
                                className="card-title"
                                style={{ fontSize: 20, display: 'inline-flex', alignItems: 'center', gap: 5 }}
                            >
                                {item.iconUrl ? (
                                    <img src={item.iconUrl} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
                                ) : (
                                    item.icon && <HugeiconsIcon icon={item.icon} size={18} />
                                )}
                                {item.value}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="card-title" style={{ fontSize: 24 }}>{stat.title}</div>
                )}
                <div className="card-meta">{stat.meta}</div>
            </div>
            {stats.length > 1 && (
                <div style={{ display: 'flex', gap: 4, alignSelf: 'flex-start', marginTop: 4 }}>
                    {stats.map((s, i) => (
                        <button
                            key={s.kicker}
                            type="button"
                            aria-label={s.kicker}
                            aria-current={i === index}
                            onClick={() => setIndex(i)}
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                background: i === index ? 'var(--color-accent)' : 'var(--color-divider)',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
