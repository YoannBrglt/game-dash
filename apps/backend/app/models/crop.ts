import { CropSchema } from '#database/schema'
import { hasMany, belongsTo, afterCreate } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Possession from '#models/possession'
import Rarity from '#models/rarity'
import User from '#models/user'
import Mutation from '#models/mutation'

export default class Crop extends CropSchema {
    @belongsTo(() => Rarity)
    declare rarity: BelongsTo<typeof Rarity>

    @hasMany(() => Possession)
    declare possessions: HasMany<typeof Possession>

    @afterCreate()
    static async createPossessionsForAllUsers(crop: Crop) {
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
            await Possession.createMany(rows)
        }
    }
}