import { PossessionSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Crop from '#models/crop'
import Mutation from '#models/mutation'
import User from './user.ts'

export default class Possession extends PossessionSchema {
    @belongsTo(() => Crop)
    declare crop: BelongsTo<typeof Crop>

    @belongsTo(() => Mutation)
    declare mutation: BelongsTo<typeof Mutation>

    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>
}