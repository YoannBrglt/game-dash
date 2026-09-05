// src/types/collections.ts

export type MutationType = 'base' | 'weather' | 'specific' | 'rarity'

export interface Rarity {
    id: number
    name: string
    rank: number
    colorHex: string | null
}

export interface Mutation {
    id: number
    name: string
    type: MutationType
    order: number | null
    description: string | null
    iconUrl: string | null
}

export interface Crop {
    id: number
    name: string
    rarityId: number
    harvestType: string
    imageUrl: string | null
    rarity: Rarity
}

export interface Collection {
    id: number
    cropId: number
    mutationId: number
    obtained: boolean
    obtainedAt: string | null
    notes: string | null
    crop: Crop
    mutation: Mutation
}

export interface CollectionsFilters {
    obtained?: boolean
    rarityId?: number
    mutationType?: MutationType
}
