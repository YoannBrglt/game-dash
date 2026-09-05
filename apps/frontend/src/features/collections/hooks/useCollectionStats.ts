import { useMemo } from 'react'
import { TrophyIcon, CheckmarkBadge02Icon, ChartAverageIcon, SparkleIcon } from '@hugeicons/core-free-icons'
import { useCollections } from './useCollections'
import { groupByCrop } from '../lib/groupByCrop'
import { getLastObtained, isDiscovered } from '../lib/organicStyles'
import type { Stat } from '../components/CyclingStatCard'
import type { Collection, Rarity } from '@/types/collections'

const RARE_MUTATIONS = ['Gold', 'Rainbow'] as const

function buildStats(collections: Collection[], totalCrops: number, discoveredCount: number): Stat[] {
    const totalSlots = collections.length
    const obtainedCount = collections.filter((c) => c.obtained).length
    const averagePerCrop = totalCrops ? obtainedCount / totalCrops : 0
    const mutationsPerCrop = totalCrops ? totalSlots / totalCrops : 13
    const completionPct = totalCrops ? Math.round((discoveredCount / totalCrops) * 100) : 0

    const rareItems = RARE_MUTATIONS.map((name) => {
        const sample = collections.find((c) => c.mutation.name === name)
        const count = collections.filter((c) => c.obtained && c.mutation.name === name).length
        return {
            iconUrl: sample?.mutation.iconUrl,
            value: `${count}/${totalCrops} ${name}`,
        }
    })

    // Extensible : ajouter d'autres entrées ici pour enrichir le cycle.
    return [
        {
            icon: TrophyIcon,
            iconBg: 'var(--color-accent-100)',
            iconColor: 'var(--color-accent-700)',
            kicker: 'Complétion',
            title: `${completionPct}%`,
            meta: `${discoveredCount} / ${totalCrops} plantes découvertes`,
        },
        {
            icon: CheckmarkBadge02Icon,
            iconBg: 'var(--color-accent-2-100)',
            iconColor: 'var(--color-accent-2-700)',
            kicker: 'Mutations collectées',
            title: `${obtainedCount} / ${totalSlots}`,
            meta: 'toutes cultures confondues',
        },
        {
            icon: ChartAverageIcon,
            iconBg: 'var(--color-accent-100)',
            iconColor: 'var(--color-accent-700)',
            kicker: 'Moyenne par plante',
            title: `${averagePerCrop.toFixed(1)} / ${mutationsPerCrop.toFixed(0)}`,
            meta: 'mutations obtenues en moyenne',
        },
        {
            icon: SparkleIcon,
            iconBg: 'var(--color-accent-2-100)',
            iconColor: 'var(--color-accent-2-700)',
            kicker: 'Mutations rares',
            items: rareItems,
            meta: 'sur l’ensemble des plantes',
        },
    ]
}

export function useCollectionStats() {
    const query = useCollections()
    const { data } = query

    const allGroups = useMemo(() => (data ? groupByCrop(data) : []), [data])

    const rarities = useMemo(() => {
        const byId = new Map<number, Rarity>()
        for (const group of allGroups) byId.set(group.crop.rarity.id, group.crop.rarity)
        return [...byId.values()].sort((a, b) => a.rank - b.rank)
    }, [allGroups])

    const discoveredGroups = useMemo(
        () => allGroups.filter((group) => isDiscovered(group.collections)),
        [allGroups]
    )

    // Dernière découverte = la mutation obtenue le plus récemment, tous
    // crops confondus (pas juste "quelle plante" mais "quelle mutation").
    const lastObtained = useMemo(() => (data ? getLastObtained(data) : undefined), [data])

    const stats = useMemo(
        () => (data ? buildStats(data, allGroups.length, discoveredGroups.length) : []),
        [data, allGroups.length, discoveredGroups.length]
    )

    return { ...query, allGroups, rarities, discoveredGroups, lastObtained, stats }
}
