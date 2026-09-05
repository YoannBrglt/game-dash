import type { Collection, Crop } from '@/types/collections'

export interface CropGroup {
    crop: Crop
    collections: Collection[]
}

export function groupByCrop(collections: Collection[]): CropGroup[] {
    const map = new Map<number, CropGroup>()
    for (const collection of collections) {
        let group = map.get(collection.cropId)
        if (!group) {
            group = { crop: collection.crop, collections: [] }
            map.set(collection.cropId, group)
        }
        group.collections.push(collection)
    }
    return [...map.values()].sort(
        (a, b) => a.crop.rarity.rank - b.crop.rarity.rank || a.crop.name.localeCompare(b.crop.name)
    )
}
