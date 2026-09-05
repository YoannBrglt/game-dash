// src/features/collections/api/api.ts
import { apiFetch } from '@/lib/api'
import type { Collection } from '@/types/collections'

// Pas de wrap `{ data: ... }` ici : CollectionsController ne passe pas par
// ctx.serialize(), contrairement aux endpoints auth (voir features/auth/api/api.ts).
export async function getCollections(): Promise<Collection[]> {
    return apiFetch<Collection[]>('/api/v1/collections')
}

export interface UpdateCollectionPayload {
    obtained: boolean
    notes?: string
}

export async function updateCollection(
    id: number,
    payload: UpdateCollectionPayload
): Promise<Collection> {
    return apiFetch<Collection>(`/api/v1/collections/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    })
}
