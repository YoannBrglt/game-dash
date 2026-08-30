import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'possessions'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
    });

    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['crop_id', 'mutation_id']);
      table.unique(['user_id', 'crop_id', 'mutation_id']);
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['user_id', 'crop_id', 'mutation_id']);
      table.unique(['crop_id', 'mutation_id']);
      table.dropColumn('user_id');
    })
  }
}