import { RaritySchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Crop from '#models/crop'

export default class Rarity extends RaritySchema {
    @hasMany(() => Crop)
    declare crops: HasMany<typeof Crop>
}