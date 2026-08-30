import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'crops'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('patch_max_capacity', 'slots')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('slots', 'patch_max_capacity')
    })
  }
}