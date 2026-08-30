import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Mutation from '#models/mutation'

export default class extends BaseSeeder {
  async run() {
    await Mutation.updateOrCreateMany('name', [
      { name: 'Normal', type: 'base', order: 0, description: 'État par défaut, sans mutation' },
      { name: 'Wet', type: 'weather', order: 1, description: 'Obtenue via météo Rain' },
      { name: 'Chilled', type: 'weather', order: 2, description: 'Obtenue via météo Snow' },
      { name: 'Thunderstruck', type: 'weather', order: 3, description: 'Obtenue via météo Thunderstorm' },
      { name: 'Dawnlit', type: 'weather', order: 4, description: 'Obtenue via météo lunaire Dawn' },
      { name: 'Amberlit', type: 'weather', order: 5, description: 'Obtenue via météo lunaire Amber Moon' },
      { name: 'Frozen', type: 'specific', order: 6, description: 'Fusion Wet + Chilled (rain et snow simultanés)' },
      { name: 'ThunderCharged', type: 'specific', order: 7, description: 'Sort activé sur une culture Thunderstruck' },
      { name: 'Dawnbound', type: 'specific', order: 8, description: 'Plante dawnlit adjacente à un DawnPod pendant météo Dawn' },
      { name: 'Amberbound', type: 'specific', order: 9, description: 'Plante amberlit adjacente à un AmberPod pendant météo Amber' },
      { name: 'Gold', type: 'rarity', order: 10, description: 'Mutation de rareté pure' },
      { name: 'Rainbow', type: 'rarity', order: 11, description: 'Mutation de rareté pure' },
      { name: 'Max', type: 'specific', order: 12, description: 'Taille aléatoire (50-100) atteint le maximum' },
    ])
  }
}