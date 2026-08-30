import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'possessions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('crop_id')
        .unsigned()
        .references('id')
        .inTable('crops')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('mutation_id')
        .unsigned()
        .references('id')
        .inTable('mutations')
        .onDelete('CASCADE')
        .notNullable()
      table.boolean('obtained').notNullable().defaultTo(false)
      table.timestamp('obtained_at').nullable()
      table.text('notes').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['crop_id', 'mutation_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}