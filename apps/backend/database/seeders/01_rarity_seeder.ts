import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Rarity from '#models/rarity'

export default class extends BaseSeeder {
  async run() {
    await Rarity.updateOrCreateMany('name', [
      { name: 'Common', rank: 1 },
      { name: 'Uncommon', rank: 2 },
      { name: 'Rare', rank: 3 },
      { name: 'Legendary', rank: 4 },
      { name: 'Mythical', rank: 5 },
      { name: 'Divine', rank: 6 },
      { name: 'Celestial', rank: 7 },
    ])
  }
}