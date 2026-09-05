import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Mutation from '#models/mutation'

export default class extends BaseSeeder {
  async run() {
    // URLs récupérées manuellement sur https://magicgarden.wiki/Mutations
    // (page derrière Cloudflare, non scrapable). Normal et Max n'ont pas
    // d'icône sur le wiki.
    await Mutation.updateOrCreateMany('name', [
      { name: 'Normal', type: 'base', order: 0, description: 'État par défaut, sans mutation', iconUrl: null },
      { name: 'Wet', type: 'weather', order: 1, description: 'Obtenue via météo Rain', iconUrl: 'https://media.magicgarden.wiki/MutationWet.png' },
      { name: 'Chilled', type: 'weather', order: 2, description: 'Obtenue via météo Snow', iconUrl: 'https://media.magicgarden.wiki/MutationChilled.png' },
      { name: 'Thunderstruck', type: 'weather', order: 3, description: 'Obtenue via météo Thunderstorm', iconUrl: 'https://media.magicgarden.wiki/MutationThunderstruck.png' },
      { name: 'Dawnlit', type: 'weather', order: 4, description: 'Obtenue via météo lunaire Dawn', iconUrl: 'https://media.magicgarden.wiki/MutationDawnlit.png' },
      { name: 'Amberlit', type: 'weather', order: 5, description: 'Obtenue via météo lunaire Amber Moon', iconUrl: 'https://media.magicgarden.wiki/MutationAmberlit.png' },
      { name: 'Frozen', type: 'specific', order: 6, description: 'Fusion Wet + Chilled (rain et snow simultanés)', iconUrl: 'https://media.magicgarden.wiki/MutationFrozen.png' },
      { name: 'ThunderCharged', type: 'specific', order: 7, description: 'Sort activé sur une culture Thunderstruck', iconUrl: 'https://media.magicgarden.wiki/MutationThundercharged.png' },
      { name: 'Dawnbound', type: 'specific', order: 8, description: 'Plante dawnlit adjacente à un DawnPod pendant météo Dawn', iconUrl: 'https://media.magicgarden.wiki/MutationDawncharged.png' },
      { name: 'Amberbound', type: 'specific', order: 9, description: 'Plante amberlit adjacente à un AmberPod pendant météo Amber', iconUrl: 'https://media.magicgarden.wiki/MutationAmbercharged.png' },
      { name: 'Gold', type: 'rarity', order: 10, description: 'Mutation de rareté pure', iconUrl: 'https://media.magicgarden.wiki/MutationGold.png' },
      { name: 'Rainbow', type: 'rarity', order: 11, description: 'Mutation de rareté pure', iconUrl: 'https://media.magicgarden.wiki/MutationRainbow.png' },
      { name: 'Max', type: 'specific', order: 12, description: 'Taille aléatoire (50-100) atteint le maximum', iconUrl: null },
    ])
  }
}