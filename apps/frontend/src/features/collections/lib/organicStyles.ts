// src/features/collections/lib/organicStyles.ts
//
// Palette pour l'écran "Collection Dashboard" importé de claude.ai/design
// (design system "Organic"). Le mock livré par le design ne connaissait que
// des données factices : 6 raretés (pas Celestial) et 6 mutations sur les 12
// réellement trackées (pas Normal, qui sert ici de porte de "découverte" —
// voir CollectionsPage). Les couleurs marquées "ajouté" ci-dessous sont donc
// des extensions de la palette d'origine, pas des valeurs venues du design.

import type { Collection } from '@/types/collections'

export interface RarityStyle {
    border: string
    tint: string
}

// Common → Divine : valeurs telles que livrées par le design.
// Celestial : ajouté (7ᵉ rareté réelle, absente du mock).
export const RARITY_STYLE: Record<string, RarityStyle> = {
    Common: { border: 'oklch(0.72 0.02 80)', tint: 'oklch(0.72 0.02 80 / 16%)' },
    Uncommon: { border: 'oklch(0.62 0.1 145)', tint: 'oklch(0.62 0.1 145 / 16%)' },
    Rare: { border: 'oklch(0.6 0.13 240)', tint: 'oklch(0.6 0.13 240 / 16%)' },
    Legendary: { border: 'oklch(0.66 0.16 45)', tint: 'oklch(0.66 0.16 45 / 18%)' },
    Mythical: { border: 'oklch(0.55 0.16 310)', tint: 'oklch(0.55 0.16 310 / 18%)' },
    Divine: { border: 'oklch(0.72 0.14 15)', tint: 'oklch(0.72 0.14 15 / 20%)' },
    Celestial: { border: 'oklch(0.62 0.14 265)', tint: 'oklch(0.62 0.14 265 / 18%)' }, // ajouté
}

// Raretés qui reçoivent le liseré animé "gilded". Le mock ne gilded-ait que
// Mythical/Divine (ses deux tiers du haut) ; Celestial étant au-dessus des
// deux, on l'ajoute au même traitement.
export const GILDED_RARITIES = new Set(['Mythical', 'Divine', 'Celestial'])

export interface MutationStyle {
    bg: string
    color: string
    extraClass?: string
}

export const MUTED: MutationStyle = { bg: 'var(--color-neutral-200)', color: 'var(--color-neutral-500)' }

// Wet/Chilled/Dawnlit/Amberlit/Gold/Rainbow : valeurs du design d'origine.
// Normal/Thunderstruck/Frozen/ThunderCharged/Dawnbound/Amberbound/Max :
// ajoutés (mutations réelles absentes du mock — le mock traitait Normal
// comme un booléen "découverte" séparé, pas comme une mutation ; voir
// isDiscovered ci-dessous), en suivant la logique de teintes du design
// (pastel pour la météo, plus saturé pour les mutations "specific" dérivées).
export const MUTATION_STYLE: Record<string, MutationStyle> = {
    // Normal est la forme "sans mutation" : teinte neutre plus soutenue que
    // MUTED pour rester visible une fois obtenue.
    Normal: { bg: 'var(--color-neutral-300)', color: 'var(--color-neutral-800)' }, // ajouté
    Wet: { bg: 'oklch(0.85 0.08 230 / 45%)', color: 'oklch(0.4 0.1 230)' },
    Chilled: { bg: 'oklch(0.88 0.06 210 / 55%)', color: 'oklch(0.42 0.08 220)' },
    Thunderstruck: { bg: 'oklch(0.82 0.12 275 / 45%)', color: 'oklch(0.4 0.14 275)' }, // ajouté
    Dawnlit: { bg: 'oklch(0.85 0.1 30 / 45%)', color: 'oklch(0.42 0.12 30)' },
    Amberlit: { bg: 'oklch(0.82 0.12 55 / 45%)', color: 'oklch(0.4 0.13 50)' },
    Frozen: { bg: 'oklch(0.9 0.05 215 / 55%)', color: 'oklch(0.4 0.08 215)' }, // ajouté
    ThunderCharged: { bg: 'oklch(0.75 0.16 275 / 55%)', color: 'oklch(0.32 0.16 275)' }, // ajouté
    Dawnbound: { bg: 'oklch(0.8 0.13 40 / 55%)', color: 'oklch(0.38 0.14 40)' }, // ajouté
    Amberbound: { bg: 'oklch(0.78 0.14 60 / 55%)', color: 'oklch(0.36 0.15 58)' }, // ajouté
    Gold: {
        bg: 'linear-gradient(115deg, oklch(0.92 0.14 90), oklch(0.72 0.17 75), oklch(0.92 0.14 90))',
        color: 'oklch(0.32 0.1 70)',
        extraClass: 'mut-gold',
    },
    Rainbow: {
        bg: 'linear-gradient(115deg, oklch(0.78 0.16 20), oklch(0.8 0.15 95), oklch(0.78 0.16 150), oklch(0.78 0.15 230), oklch(0.78 0.16 300), oklch(0.78 0.16 20))',
        color: 'oklch(0.22 0.02 0)',
        extraClass: 'mut-rainbow',
    },
    // Max n'est pas élémentaire (taille aléatoire au maximum) : on emprunte
    // l'accent secondaire (sage) du design plutôt qu'une teinte météo. Ajouté.
    Max: { bg: 'var(--color-accent-2-200)', color: 'var(--color-accent-2-800)' },
}

const MONTHS = ['jan.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

export function formatDate(iso: string): string {
    const d = new Date(iso)
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

// Une crop est "découverte" dès qu'au moins une de ses 13 mutations est
// obtenue — Normal n'a rien de spécial, on peut très bien obtenir Frozen
// avant Normal (retour utilisateur : ne pas en faire une porte de découverte).
export function isDiscovered(collections: Collection[]): boolean {
    return collections.some((c) => c.obtained)
}

// La mutation obtenue le plus récemment dans une liste de collections
// (utilisé pour "dernière découverte", sur l'ensemble de la collection).
export function getLastObtained(collections: Collection[]): Collection | undefined {
    return collections
        .filter((c) => c.obtained && c.obtainedAt)
        .sort((a, b) => b.obtainedAt!.localeCompare(a.obtainedAt!))[0]
}
