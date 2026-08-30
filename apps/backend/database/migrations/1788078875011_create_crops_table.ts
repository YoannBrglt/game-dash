import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'crops'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()

      table
        .integer('rarity_id')
        .unsigned()
        .references('id')
        .inTable('rarities')
        .onDelete('RESTRICT')
        .notNullable()

      table.string('harvest_type').notNullable() // 'single' | 'regrow' | 'patch'
      table.integer('patch_yield_min').nullable()
      table.integer('patch_yield_max').nullable()
      table.integer('patch_max_capacity').nullable()

      table.string('image_url').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}