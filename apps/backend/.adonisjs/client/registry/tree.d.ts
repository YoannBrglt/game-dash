/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  collections: {
    index: typeof routes['collections.index']
    store: typeof routes['collections.store']
    show: typeof routes['collections.show']
    update: typeof routes['collections.update']
    destroy: typeof routes['collections.destroy']
  }
}
