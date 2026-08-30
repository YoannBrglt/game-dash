import { BaseCommand, args, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { readFileSync } from 'node:fs'
import Crop from '#models/crop'
import Mutation from '#models/mutation'
import Possession from '#models/possession'


// Certains noms ont changé entre ton ancien CSV et le référentiel basé sur le wiki
const cropNameAliases: Record<string, string> = {
  MilkCap: 'Milkcap',
  Lytchee: 'Lychee',
  'Cacao Fruit': 'Cacao',
  'Starweaver Fruit': 'Starweaver',
}

const mutationColumnMap: Record<string, string> = {
  Normal: 'Normal',
  Wet: 'Wet',
  Chilled: 'Chilled',
  Frozen: 'Frozen',
  Dawnlit: 'Dawnlit',
  Amberlit: 'Amberlit',
  Thunder: 'Thunderstruck',
  Gold: 'Gold',
  Rainbow: 'Rainbow',
  Dawnbound: 'Dawnbound',
  Amberbound: 'Amberbound',
  'Thunder Charged': 'ThunderCharged',
  Max: 'Max',
}

export default class ImportPossessions extends BaseCommand {
  static commandName = 'import:possessions'
  static description = 'Importe la collections depuis un export CSV du tableau de suivi google sheets de magic garden'

  static options: CommandOptions = { startApp: true }

  @args.string({ description: 'Chemin vers le fichier CSV' })
  declare filePath: string

  @flags.number({ description: "ID utilisateur propriétaire" })
  declare userId: number

  async run() {
    const crops = await Crop.all()
    const cropIdByName = Object.fromEntries(crops.map((crop) => [crop.name, crop.id]))

    const mutations = await Mutation.all()
    const mutationIdByName = Object.fromEntries(mutations.map((mutation) => [mutation.name, mutation.id]))

    const csvContent = readFileSync(this.filePath, 'utf-8')
    const lines = csvContent.split('\n')
    const header = lines[2].split(',').map((h) => h.trim())
    const dataLines = lines.slice(3).map((line) => line.trim()).filter((l) => l.length > 0)

    let imported = 0

    for (const line of dataLines) {
      const cols = line.split(',')
      const rawName = cols[2]?.trim()
      if (!rawName) continue

      const cropName = cropNameAliases[rawName] ?? rawName
      const cropId = cropIdByName[cropName]
      if (!cropId) {
        this.logger.warning(`Crop introuvable en base: "${cropName}" (CSV: "${rawName}")`)
        continue
      }

      for (const [csvHeader, mutationName] of Object.entries(mutationColumnMap)) {
        const colIndex = header.indexOf(csvHeader)
        const mutationId = mutationIdByName[mutationName]
        if (colIndex === -1 || !mutationId) continue

        const obtained = cols[colIndex]?.trim().toUpperCase() === 'TRUE'
        const userId = this.userId

        await Possession.updateOrCreate(
          { cropId, mutationId, userId },
          { obtained }
        )
        imported++
      }
    }

    this.logger.success(`${imported} possessions importées/mises à jour.`)
  }
}