import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Crop from '#models/crop'
import Rarity from '#models/rarity'

type HarvestType = 'single' | 'regrow' | 'patch'

interface WikiCrop {
  name: string
  rarity: string
  harvestType: HarvestType
  slots: number
  patchYieldMin?: number
  patchYieldMax?: number
  imageUrl: string
}

// Source : https://magicgarden.wiki/Crops — snapshot du 30/08/2026
const wikiCrops: WikiCrop[] = [
  { name: 'Carrot', rarity: 'Common', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Carrot.png/20px-Carrot.png' },
  { name: 'Cabbage', rarity: 'Common', harvestType: 'regrow', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Cabbage.png/20px-Cabbage.png' },
  { name: 'Strawberry', rarity: 'Common', harvestType: 'regrow', slots: 5, imageUrl: 'https://media.magicgarden.wiki/thumb/Strawberry.png/20px-Strawberry.png' },
  { name: 'Aloe', rarity: 'Common', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Aloe.png/20px-Aloe.png' },
  { name: 'Beet', rarity: 'Common', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Beet.png/20px-Beet.png' },
  { name: 'Clover', rarity: 'Uncommon', harvestType: 'patch', slots: 15, patchYieldMin: 7, patchYieldMax: 11, imageUrl: 'https://media.magicgarden.wiki/thumb/Clover.png/20px-Clover.png' },
  { name: 'Four-Leaf Clover', rarity: 'Legendary', harvestType: 'patch', slots: 15, patchYieldMin: 7, patchYieldMax: 11, imageUrl: 'https://media.magicgarden.wiki/thumb/Four-Leaf_Clover.png/20px-Four-Leaf_Clover.png' },
  { name: 'Rose', rarity: 'Uncommon', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Rose.png/20px-Rose.png' },
  { name: 'Delphinium', rarity: 'Uncommon', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Delphinium.png/20px-Delphinium.png' },
  { name: 'Snowdrop', rarity: 'Uncommon', harvestType: 'patch', slots: 12, patchYieldMin: 4, patchYieldMax: 6, imageUrl: 'https://media.magicgarden.wiki/thumb/Snowdrop.png/20px-Snowdrop.png' },
  { name: 'Double Snowdrop', rarity: 'Legendary', harvestType: 'patch', slots: 12, patchYieldMin: 4, patchYieldMax: 6, imageUrl: 'https://media.magicgarden.wiki/thumb/Double_Snowdrop.png/20px-Double_Snowdrop.png' },
  { name: 'Fava Bean', rarity: 'Uncommon', harvestType: 'regrow', slots: 8, imageUrl: 'https://media.magicgarden.wiki/thumb/Fava_Bean_Pod.png/20px-Fava_Bean_Pod.png' },
  { name: 'Blueberry', rarity: 'Uncommon', harvestType: 'regrow', slots: 5, imageUrl: 'https://media.magicgarden.wiki/thumb/Blueberry.png/20px-Blueberry.png' },
  { name: 'Apple', rarity: 'Uncommon', harvestType: 'regrow', slots: 7, imageUrl: 'https://media.magicgarden.wiki/thumb/Apple.png/20px-Apple.png' },
  { name: 'Tulip', rarity: 'Uncommon', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Tulip.png/20px-Tulip.png' },
  { name: 'Tomato', rarity: 'Uncommon', harvestType: 'regrow', slots: 2, imageUrl: 'https://media.magicgarden.wiki/thumb/Tomato.png/20px-Tomato.png' },
  { name: 'Daisy', rarity: 'Uncommon', harvestType: 'patch', slots: 9, patchYieldMin: 2, patchYieldMax: 3, imageUrl: 'https://media.magicgarden.wiki/thumb/Daisy.png/20px-Daisy.png' },
  { name: 'Purple Daisy', rarity: 'Legendary', harvestType: 'patch', slots: 9, patchYieldMin: 2, patchYieldMax: 3, imageUrl: 'https://media.magicgarden.wiki/thumb/Purple_Daisy.png/20px-Purple_Daisy.png' },
  { name: 'Daffodil', rarity: 'Rare', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Daffodil.png/20px-Daffodil.png' },
  { name: 'Corn', rarity: 'Rare', harvestType: 'regrow', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Corn.png/20px-Corn.png' },
  { name: 'Watermelon', rarity: 'Rare', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Watermelon.png/20px-Watermelon.png' },
  { name: 'Echeveria', rarity: 'Rare', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Echeveria.png/20px-Echeveria.png' },
  { name: 'Pumpkin', rarity: 'Rare', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Pumpkin.png/20px-Pumpkin.png' },
  { name: 'Cattail', rarity: 'Rare', harvestType: 'patch', slots: 14, patchYieldMin: 6, patchYieldMax: 10, imageUrl: 'https://media.magicgarden.wiki/thumb/Cattail.png/20px-Cattail.png' },
  { name: 'Variegated Cattail', rarity: 'Legendary', harvestType: 'patch', slots: 14, patchYieldMin: 6, patchYieldMax: 10, imageUrl: 'https://media.magicgarden.wiki/thumb/Variegated_Cattail.png/20px-Variegated_Cattail.png' },
  { name: 'Pear', rarity: 'Rare', harvestType: 'regrow', slots: 7, imageUrl: 'https://media.magicgarden.wiki/thumb/Pear.png/20px-Pear.png' },
  { name: 'Gentian', rarity: 'Rare', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Gentian.png/20px-Gentian.png' },
  { name: 'Lavender', rarity: 'Rare', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Lavender.png/20px-Lavender.png' },
  { name: 'Coconut', rarity: 'Legendary', harvestType: 'regrow', slots: 7, imageUrl: 'https://media.magicgarden.wiki/thumb/Coconut.png/20px-Coconut.png' },
  { name: 'Pine Tree', rarity: 'Legendary', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Pine_Tree.png/20px-Pine_Tree.png' },
  { name: 'Banana', rarity: 'Legendary', harvestType: 'regrow', slots: 5, imageUrl: 'https://media.magicgarden.wiki/thumb/Banana.png/20px-Banana.png' },
  { name: 'Leek', rarity: 'Legendary', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Leek.png/20px-Leek.png' },
  { name: 'Lily', rarity: 'Legendary', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Lily.png/20px-Lily.png' },
  { name: 'Camellia', rarity: 'Legendary', harvestType: 'regrow', slots: 8, imageUrl: 'https://media.magicgarden.wiki/thumb/Camellia.png/20px-Camellia.png' },
  { name: 'Squash', rarity: 'Legendary', harvestType: 'regrow', slots: 3, imageUrl: 'https://media.magicgarden.wiki/thumb/Squash.png/20px-Squash.png' },
  { name: 'Peach', rarity: 'Legendary', harvestType: 'regrow', slots: 7, imageUrl: 'https://media.magicgarden.wiki/thumb/Peach.png/20px-Peach.png' },
  { name: "Burro's Tail", rarity: 'Legendary', harvestType: 'regrow', slots: 2, imageUrl: 'https://media.magicgarden.wiki/thumb/Burro%27s_Tail.png/20px-Burro%27s_Tail.png' },
  { name: 'Cardoon', rarity: 'Legendary', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Cardoon.png/20px-Cardoon.png' },
  { name: 'Saffron', rarity: 'Legendary', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Saffron.png/20px-Saffron.png' },
  { name: 'Persimmon', rarity: 'Legendary', harvestType: 'regrow', slots: 6, imageUrl: 'https://media.magicgarden.wiki/thumb/Persimmon.png/20px-Persimmon.png' },
  { name: 'Mushroom', rarity: 'Mythical', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Mushroom.png/20px-Mushroom.png' },
  { name: 'Cactus', rarity: 'Mythical', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Cactus.png/20px-Cactus.png' },
  { name: 'Bamboo', rarity: 'Mythical', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Bamboo.png/20px-Bamboo.png' },
  { name: 'Violet Cort', rarity: 'Mythical', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Violet_Cort.png/20px-Violet_Cort.png' },
  { name: 'Chrysanthemum', rarity: 'Mythical', harvestType: 'regrow', slots: 7, imageUrl: 'https://media.magicgarden.wiki/thumb/Chrysanthemum.png/20px-Chrysanthemum.png' },
  { name: 'Date', rarity: 'Mythical', harvestType: 'regrow', slots: 11, imageUrl: 'https://media.magicgarden.wiki/thumb/Date.png/20px-Date.png' },
  { name: 'Habanero', rarity: 'Mythical', harvestType: 'regrow', slots: 8, imageUrl: 'https://media.magicgarden.wiki/thumb/Habanero.png/20px-Habanero.png' },
  { name: 'Grape', rarity: 'Mythical', harvestType: 'regrow', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Grape.png/20px-Grape.png' },
  { name: 'Poinsettia', rarity: 'Mythical', harvestType: 'regrow', slots: 4, imageUrl: 'https://media.magicgarden.wiki/thumb/Poinsettia.png/20px-Poinsettia.png' },
  { name: 'Prickly Pear', rarity: 'Mythical', harvestType: 'regrow', slots: 5, imageUrl: 'https://media.magicgarden.wiki/thumb/Prickly_Pear.png/20px-Prickly_Pear.png' },
  { name: 'Eggplant', rarity: 'Mythical', harvestType: 'regrow', slots: 3, imageUrl: 'https://media.magicgarden.wiki/thumb/Eggplant.png/20px-Eggplant.png' },
  { name: 'Pepper', rarity: 'Divine', harvestType: 'regrow', slots: 9, imageUrl: 'https://media.magicgarden.wiki/thumb/Pepper.png/20px-Pepper.png' },
  { name: 'Lemon', rarity: 'Divine', harvestType: 'regrow', slots: 6, imageUrl: 'https://media.magicgarden.wiki/thumb/Lemon.png/20px-Lemon.png' },
  { name: 'Passion Fruit', rarity: 'Divine', harvestType: 'regrow', slots: 2, imageUrl: 'https://media.magicgarden.wiki/thumb/Passion_Fruit.png/20px-Passion_Fruit.png' },
  { name: 'Dragon Fruit', rarity: 'Divine', harvestType: 'regrow', slots: 7, imageUrl: 'https://media.magicgarden.wiki/thumb/Dragon_Fruit.png/20px-Dragon_Fruit.png' },
  { name: 'Cacao', rarity: 'Divine', harvestType: 'regrow', slots: 6, imageUrl: 'https://media.magicgarden.wiki/thumb/Cacao_Fruit.png/20px-Cacao_Fruit.png' },
  { name: 'Lychee', rarity: 'Divine', harvestType: 'regrow', slots: 6, imageUrl: 'https://media.magicgarden.wiki/thumb/Lychee.png/20px-Lychee.png' },
  { name: 'Milkcap', rarity: 'Divine', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Milkcap.png/20px-Milkcap.png' },
  { name: 'Ube', rarity: 'Divine', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Ube.png/20px-Ube.png' },
  { name: 'Sunflower', rarity: 'Divine', harvestType: 'regrow', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Sunflower.png/20px-Sunflower.png' },
  { name: 'Marigold', rarity: 'Divine', harvestType: 'regrow', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Marigold.png/20px-Marigold.png' },
  { name: 'Thunderpeel', rarity: 'Celestial', harvestType: 'regrow', slots: 12, imageUrl: 'https://media.magicgarden.wiki/thumb/Thunderpeel.png/20px-Thunderpeel.png' },
  { name: 'Stormcap', rarity: 'Celestial', harvestType: 'regrow', slots: 4, imageUrl: 'https://media.magicgarden.wiki/thumb/Stormcap.png/20px-Stormcap.png' },
  { name: 'Dawnbreaker', rarity: 'Celestial', harvestType: 'single', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Dawnbreaker.png/20px-Dawnbreaker.png' },
  { name: 'Emberbloom', rarity: 'Celestial', harvestType: 'patch', slots: 15, patchYieldMin: 5, patchYieldMax: 7, imageUrl: 'https://media.magicgarden.wiki/thumb/Emberbloom.png/20px-Emberbloom.png' },
  { name: 'Embercrown', rarity: 'Celestial', harvestType: 'patch', slots: 15, patchYieldMin: 5, patchYieldMax: 7, imageUrl: 'https://media.magicgarden.wiki/thumb/Embercrown.png/20px-Embercrown.png' },
  { name: 'Starweaver', rarity: 'Celestial', harvestType: 'regrow', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Starweaver_Fruit.png/20px-Starweaver_Fruit.png' },
  { name: 'Dawnbinder', rarity: 'Celestial', harvestType: 'regrow', slots: 1, imageUrl: 'https://media.magicgarden.wiki/thumb/Dawnbinder_Bulb.png/20px-Dawnbinder_Bulb.png' },
  { name: 'Moonbinder', rarity: 'Celestial', harvestType: 'regrow', slots: 3, imageUrl: 'https://media.magicgarden.wiki/thumb/Moonbinder_Bulb.png/20px-Moonbinder_Bulb.png' },
]

export default class extends BaseSeeder {
  async run() {
    const rarities = await Rarity.all()
    const rarityIdByName = new Map(rarities.map((r) => [r.name, r.id]))

    const crops = wikiCrops.map((crop) => {
      const rarityId = rarityIdByName.get(crop.rarity)
      if (!rarityId) {
        throw new Error(`Rareté inconnue "${crop.rarity}" pour la crop "${crop.name}"`)
      }

      return {
        name: crop.name,
        rarityId,
        harvestType: crop.harvestType,
        slots: crop.slots,
        patchYieldMin: crop.patchYieldMin ?? null,
        patchYieldMax: crop.patchYieldMax ?? null,
        imageUrl: crop.imageUrl,
      }
    })

    await Crop.updateOrCreateMany('name', crops)
  }
}