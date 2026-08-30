import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Collection from '#models/collection'

export default class CollectionsController {
    async index({ request, auth }: HttpContext) {
        const user = auth.getUserOrFail()
        const { obtained, cropId, mutationId, rarityId, mutationType } = request.qs()

        const query = Collection.query()
            .where('userId', user.id)
            .preload('crop', (cropQuery) => cropQuery.preload('rarity'))
            .preload('mutation')

        if (obtained !== undefined) {
            query.where('obtained', obtained === 'true')
        }
        if (cropId) {
            query.where('cropId', cropId)
        }
        if (mutationId) {
            query.where('mutationId', mutationId)
        }
        if (mutationType) {
            query.whereHas('mutation', (mutationQuery) => {
                mutationQuery.where('type', mutationType)
            })
        }
        if (rarityId) {
            query.whereHas('crop', (cropQuery) => {
                cropQuery.where('rarityId', rarityId)
            })
        }

        return query
    }

    async update({ params, request, auth }: HttpContext) {
        const user = auth.getUserOrFail()
        const { obtained, notes } = request.only(['obtained', 'notes'])
        
       const collection = await Collection.query().where('id', params.id).where('userId', user.id).firstOrFail()
       
        collection.obtained = obtained
        collection.obtainedAt = obtained ? DateTime.now() : null
        if (notes !== undefined) {
            collection.notes = notes
        }

        await collection.save()
        return collection
    }
}