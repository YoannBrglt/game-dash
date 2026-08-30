import { CropSchema } from '#database/schema'
import { hasMany, belongsTo, afterCreate } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Collection from '#models/collection'
import Rarity from '#models/rarity'
import User from '#models/user'
import Mutation from '#models/mutation'

export default class Crop extends CropSchema {
    @belongsTo(() => Rarity)
    declare rarity: BelongsTo<typeof Rarity>

    @hasMany(() => Collection)
    declare collections: HasMany<typeof Collection>

    @afterCreate()
    static async createCollectionsForAllUsers(crop: Crop) {
        const users = await User.all()
        const mutations = await Mutation.all()

        const rows = users.flatMap((user) =>
            mutations.map((mutation) => ({
                userId: user.id,
                cropId: crop.id,
                mutationId: mutation.id,
                obtained: false,
            }))
        )

        if (rows.length > 0) {
            await Collection.createMany(rows)
        }
    }
}