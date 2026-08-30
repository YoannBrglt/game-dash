import { MutationSchema } from '#database/schema'
import { hasMany, afterCreate } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Possession from '#models/possession'
import Crop from '#models/crop'
import User from '#models/user'

export default class Mutation extends MutationSchema {
    @hasMany(() => Possession)
    declare possessions: HasMany<typeof Possession>

    @afterCreate()
    static async createPossessionsForAllUsers(mutation: Mutation) {
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
            await Possession.createMany(rows)
        }
    }
}