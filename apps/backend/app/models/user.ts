import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { afterCreate } from '@adonisjs/lucid/orm'
import Crop from '#models/crop'
import Mutation from '#models/mutation'
import Collection from '#models/collection'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  @afterCreate()
  static async createCollections(user: User) {
    const crops = await Crop.all();
    const mutations = await Mutation.all();

    const rows = crops.flatMap((crop) =>
      mutations.map((mutation) => ({
        userId: user.id,
        cropId: crop.id,
        mutationId: mutation.id,
        obtained: false,
      }))
    );

    if (rows.length > 0) {
      await Collection.createMany(rows)
    }
  }
}
