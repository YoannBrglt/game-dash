import { MutationSchema } from '#database/schema'
import { hasMany, afterCreate } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Collection from '#models/collection'
import Crop from '#models/crop'
import User from '#models/user'

export default class Mutation extends MutationSchema {
    @hasMany(() => Collection)
    declare collections: HasMany<typeof Collection>

    @afterCreate()
    static async createCollectionsForAllUsers(mutation: Mutation) {
        const users = await User.all()
        const crops = await Crop.all()

        const rows = users.flatMap((user) =>
            crops.map((crop) => ({
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