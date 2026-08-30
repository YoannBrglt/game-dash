import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {

  async up() {
    this.schema.renameTable('possessions', 'collections')
  }

  async down() {
    this.schema.renameTable('collections', 'possessions')
  }
}